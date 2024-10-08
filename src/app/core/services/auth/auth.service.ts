import { Injectable } from '@angular/core'

import { BehaviorSubject, Observable } from 'rxjs'

import { User } from '../../interfaces/user.interface'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({providedIn: 'root'})

export class AuthService {

    private isLoggedIn = new BehaviorSubject<User | null>(null)
    public isLoggedInObs = this.isLoggedIn.asObservable()

    URL = 'https://e-commerce-b1516-default-rtdb.firebaseio.com'

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    changeIsLoggedInStatus(user: User): void {
        this.isLoggedIn.next(user)
    }

    logout(): void {
        this.isLoggedIn.next(null)
        localStorage.removeItem('user')
        this.router.navigate(['/auth'])
    }

    registerUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.URL}/users.json`, user)
    }
}