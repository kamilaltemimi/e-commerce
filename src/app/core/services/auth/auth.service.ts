import { Injectable } from '@angular/core'

import { BehaviorSubject, Observable } from 'rxjs'

import { User } from '../../interfaces/user.interface'
import { HttpClient } from '@angular/common/http'

@Injectable({providedIn: 'root'})

export class AuthService {

    private isLoggedIn = new BehaviorSubject<User | null>(null)
    public isLoggedInObs = this.isLoggedIn.asObservable()

    URL = 'https://e-commerce-b1516-default-rtdb.firebaseio.com'

    constructor(
        private http: HttpClient
    ) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.URL}/users.json`)
    }

    registerUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.URL}/users.json`, user)
    }
}