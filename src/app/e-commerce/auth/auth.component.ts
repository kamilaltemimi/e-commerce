import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { PrivacyNoticeComponent } from '../privacy-notice/privacy-notice.component'

import { PrivacyNoticeService } from '../../core/services/privacy-notice/privacy-notice.service'
import { AuthService } from '../../core/services/auth/auth.service'
import { UserService } from '../../core/services/user/user.service'

import { AuthMethod } from '../../core/enums/auth-method/auth-method.enum'
import { ErrorMessage } from '../../core/enums/error-message/error-message.enum'
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
    
    public isPrivacyNoticeActive = false
    public accountCreated = false

    public errors = {
        login: false,
        register: false
    }
    public errorMessage = {
        loginError: ErrorMessage.loginError,
        registerError: ErrorMessage.registerError
    }
    
    public authMethod = AuthMethod.login

    private users: User[] = []

    public authForm!: FormGroup

    public credentialsLength = {
        email: 0,
        password: 0
    }

    private unsubscribe$ = new Subject<void>()

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
        this.accountCreated = false
        this.errors.login = false
        this.errors.register = false
        this.authForm.reset()
        if (this.authMethod === AuthMethod.login) {
            this.authMethod = AuthMethod.register
        } else {
            this.authMethod = AuthMethod.login
        }
    }

    submitAuthForm(): void {
        const { password, email} = this.authForm.value

        if (this.authMethod === AuthMethod.login) {
            if (this.users) {
                const userFound = this.users.find((user: User) => user.email === email && user.password === password)
                if (userFound) {
                    this.authService.changeIsLoggedInStatus(userFound)
                    this.router.navigate([''])
                    localStorage.setItem('user', JSON.stringify(userFound))
                } else {
                    this.errors.login = true
                }
            }
        } else {
            const userFound = this.users.find((user: User) => user.email === email && user.password === password)
            if (userFound) {
                this.errors.register = true
                this.accountCreated = false
                return
            }
            const userToRegister = this.authForm.value
            this.authService.registerUser(userToRegister)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(() => this.getUsers())
            this.authForm.reset()
            this.accountCreated = true
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
        this.privacyNoticeService.privacyNoticeStatus$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data: boolean) => this.isPrivacyNoticeActive = data)
    }
}