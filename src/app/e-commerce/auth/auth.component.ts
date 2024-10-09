import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { PrivacyNoticeComponent } from '../privacy-notice/privacy-notice.component'

import { PrivacyNoticeService } from '../../core/services/privacy-notice/privacy-notice.service'
import { AuthService } from '../../core/services/auth/auth.service'
import { UserService } from '../../core/services/user/user.service'

import { AuthMethod } from '../../core/enums/auth-method/auth-method.enum'
import { User } from '../../core/interfaces/user/user.interface'

import { Subject, takeUntil } from 'rxjs'

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [CommonModule, PrivacyNoticeComponent, ReactiveFormsModule],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
})

export class AuthComponent implements OnInit, OnDestroy {
    
    isPrivacyNoticeActive = false
    invalidCredentials = false

    authMethod = AuthMethod.login

    loginLength = 0
    passwordLength = 0

    users: User[] = []

    authForm!: FormGroup

    credentialsLength = {
        email: 0,
        password: 0
    }

    unsubscribe$ = new Subject<void>()

    constructor(
        private privacyNoticeService: PrivacyNoticeService,
        private authService: AuthService,
        private userService: UserService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.followPrivacyNoticeStatus()
        this.initializeForm()
        this.getUsers()
        this.controlCredentialsLength()
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

    changePrivacyNoticeStatus(): void {
        this.privacyNoticeService.changePrivacyNoticeStatus()
    }

    switchAuthMethod(): void {
        this.invalidCredentials = false
        if (this.authMethod === AuthMethod.login) {
            this.authMethod = AuthMethod.register
        } else {
            this.authMethod = AuthMethod.login
        }
    }

    submitAuthForm(): void {
        if (this.authMethod === AuthMethod.login) {
            const { password, email} = this.authForm.value
            if (this.users) {
                const userFound = this.users.find((user: User) => user.email === email && user.password === password)
                if (userFound) {
                    this.authService.changeIsLoggedInStatus(userFound)
                    this.router.navigate([''])
                    localStorage.setItem('user', JSON.stringify(userFound))
                } else {
                    this.invalidCredentials = true
                }
            }
        } else {
            const userToRegister = this.authForm.value
            this.authService.registerUser(userToRegister)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe()
        }
    }

    initializeForm(): void {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
            password: ['', [Validators.required, Validators.maxLength(30)]]
        })
    }

    getUsers(): void {
        this.userService.getUsers().subscribe((data: User[]) => {
            this.users = data
        })
    }

    controlCredentialsLength(): void {
        this.authForm.get('email')?.valueChanges
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: string) => this.credentialsLength.email = data.length)
        this.authForm.get('password')?.valueChanges
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: string) => this.credentialsLength.password = data.length)
    }

    followPrivacyNoticeStatus(): void {
        this.privacyNoticeService.privacyNoticeStatusObs
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: boolean) => this.isPrivacyNoticeActive = data)
    }
}