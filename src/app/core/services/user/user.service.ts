import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { map, Observable } from 'rxjs'

import { User } from '../../interfaces/user/user.interface'

@Injectable({providedIn: 'root'})

export class UserService {

    private URL = 'https://e-commerce-b1516-default-rtdb.firebaseio.com'

    constructor(
        private http: HttpClient
    ) {}
    
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.URL}/users.json`).pipe(
            map((users: User[]) => {
                let userArray: User[] = []
                for (const key in users) {
                    userArray.push({...users[key]})
                } return userArray
            })
        )
    }
}