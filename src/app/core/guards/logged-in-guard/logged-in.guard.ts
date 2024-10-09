import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'

import { map, Observable } from 'rxjs'
import { AuthService } from '../../services/auth/auth.service'
import { User } from '../../interfaces/user/user.interface'

@Injectable({providedIn: 'root'})

export class LoggedInGuard implements CanActivate {

    constructor(
        private authService:  AuthService
    ) {}
    
    canActivate(): Observable<boolean> {
        return this.authService.isLoggedIn$.pipe(
            map((data: User | null) => {
                if (!data) {
                    return true
                } else {
                    return false
                }
            })
        )
    }
}