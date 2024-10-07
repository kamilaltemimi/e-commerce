import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import { PrivacyNoticeComponent } from '../privacy-notice/privacy-notice.component'

import { PrivacyNoticeService } from '../../core/services/privacy-notice/privacy-notice.service'
import { AuthService } from '../../core/services/auth/auth.service'

import { AuthMethod } from '../../core/enums/auth-method/auth-method.enum'
import { User } from '../../core/interfaces/user.interface'

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [CommonModule, PrivacyNoticeComponent, ReactiveFormsModule],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
})

export class AuthComponent implements OnInit {
    
    isPrivacyNoticeActive = false
    authMethod = AuthMethod.login

    users?: User[] | null

    authForm!: FormGroup

    constructor(
        private privacyNoticeService: PrivacyNoticeService,
        private authService: AuthService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.privacyNoticeService.privacyNoticeStatusObs.subscribe((data: boolean) => this.isPrivacyNoticeActive = data)
        this.initializeForm()
        this.getUsers()
    }

    changePrivacyNoticeStatus(): void {
        this.privacyNoticeService.changePrivacyNoticeStatus()
    }

    switchAuthMethod(): void {
        if (this.authMethod === AuthMethod.login) {
            this.authMethod = AuthMethod.register
        } else {
            this.authMethod = AuthMethod.login
        }
    }

    submitAuthForm(): void {
        if (this.authMethod === AuthMethod.login) {

        } else {
            const userToRegister = this.authForm.value
            this.authService.registerUser(userToRegister).subscribe()
        }
    }

    initializeForm(): void {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        })
    }

    getUsers(): void {
        this.authService.getUsers().subscribe((data: User[] | null) => {
            this.users = data
        })
    }
}