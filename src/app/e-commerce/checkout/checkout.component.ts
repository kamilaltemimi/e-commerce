import { Component, OnDestroy, OnInit } from '@angular/core'

import { AuthService } from '../../core/services/auth/auth.service'

import { User } from '../../core/interfaces/user/user.interface'

import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms'

import { CommonModule } from '@angular/common'
import { BasketService } from '../../core/services/basket/basket.service'

import { Subject, takeUntil } from 'rxjs'
import { PaymentConfirmationService } from '../../core/services/paymentConfirmation/paymentConfirmation.service'
import { RoutingService } from '../../core/services/routing/routing.service'

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss'
})

export class CheckoutComponent implements OnInit, OnDestroy {

    public paymentForm!: FormGroup
    public basketSum = 0
    public activeUserEmail = ''

    private unsubscribe$ = new Subject<void>()

    constructor(
        private authService: AuthService,
        private basketService: BasketService,
        private paymentConfirmationService: PaymentConfirmationService,
        private routingService: RoutingService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.getBasketSum()
        this.getActiveUserEmail()
        this.initializeForm()
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

    getActiveUserEmail(): void {
        this.authService.isLoggedIn$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((user: User | null) => {
            if (user) this.activeUserEmail = user.email
        })
    }

    initializeForm(): void {
        this.paymentForm = this.fb.group({
            email: [this.activeUserEmail, Validators.required],
            fullName: ['', Validators.required],
            address: ['', Validators.required],
            zip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]],
            nameOnCard: ['', Validators.required],
            creditCardNumber: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(24)]],
            expiration: ['', Validators.required],
            cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
        })
    }

    getBasketSum(): void {
        this.basketSum = this.basketService.BasketSum
    }

    pay(): void {
        console.log(this.paymentForm.value)
        this.paymentConfirmationService.DeliveryInfo = this.paymentForm.value
        this.paymentForm.reset()
        this.basketService.BasketData = []
        this.basketService.BasketQuantity = 0
        this.removeLocalStorage(['basketQuantity', 'basket', 'selectedProduct'])
        this.routingService.navigate('delivery-confirmation')
    }

    removeLocalStorage(keys: string[]): void {
        keys.forEach((key: string) => {
            localStorage.removeItem(key)
        })
    }
}