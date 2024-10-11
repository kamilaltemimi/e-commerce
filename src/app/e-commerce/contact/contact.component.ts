import { Component, OnInit } from '@angular/core'

import { CommonModule } from '@angular/common'

import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms'

import emailjs from 'emailjs-com';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})

export class ContactComponent implements OnInit {
    
    public contactForm!: FormGroup

    public confirmation = false
    public error = false

    constructor(
        private fb: FormBuilder
    ) {}
    
    ngOnInit(): void {
        this.initializeForm()
    }

    sendMessage(): void {
        emailjs.send('service_jf2jtdz', 'template_2wvonnc', this.contactForm?.value, '_KbxaWTfpTSUfhgK9')
            .then(() => {
                this.contactForm.reset()
                this.confirmation = true
            })
            .catch(() => {
                this.error = true
            })
    }

    initializeForm(): void {
        this.contactForm = this.fb.group({
            fullName: ['', Validators.required],
            email: ['', Validators.required],
            message: ['', Validators.required]
        })
    }
}