import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

import { AuthService } from '../services/auth/auth.service'

import { User } from '../interfaces/user.interface'

import { map } from 'rxjs'

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate() {
        return this.authService.isLoggedInObs.pipe(
            map((data: User | null) => {
                if (data) {
                    return true
                } else {
                    this.router.navigate(['auth'])
                    return false
                }
            })
        )
    }
}