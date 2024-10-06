import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

import { AuthService } from '../services/auth.service'

import { User } from '../interfaces/user.interface'

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate() {
        let isLoggedIn: User | null = this.authService.isLoggedIn.value

        if (isLoggedIn) {
            return true
        } else {
            this.router.navigate(['auth'])
            return false
        }
    }
}