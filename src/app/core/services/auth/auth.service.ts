import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

import { BehaviorSubject, Observable } from 'rxjs'

import { User } from '../../interfaces/user/user.interface'

import { BasketService } from '../basket/basket.service'

@Injectable({providedIn: 'root'})

export class AuthService {

    private isLoggedIn = new BehaviorSubject<User | null>(null)
    public isLoggedIn$ = this.isLoggedIn.asObservable()

    private URL = 'https://e-commerce-b1516-default-rtdb.firebaseio.com'

    constructor(
        private http: HttpClient,
        private router: Router,
        private basketService: BasketService
    ) {}

    changeIsLoggedInStatus(user: User): void {
        this.isLoggedIn.next(user)
    }

    logout(): void {
        this.isLoggedIn.next(null)
        localStorage.clear()
        this.basketService.setBasketQuantity = 0
        this.basketService.setBasketData = []
        this.router.navigate(['/auth'])
    }

    registerUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.URL}/users.json`, user)
    }
}