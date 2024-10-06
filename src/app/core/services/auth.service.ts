import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

import { User } from '../interfaces/user.interface'

@Injectable({providedIn: 'root'})

export class AuthService {

    isLoggedIn = new BehaviorSubject<User | null>(null)

}