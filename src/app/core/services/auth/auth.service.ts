import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

import { User } from '../../interfaces/user.interface'

@Injectable({providedIn: 'root'})

export class AuthService {

    private isLoggedIn = new BehaviorSubject<User | null>(null)
    public isLoggedInObs = this.isLoggedIn.asObservable()

}