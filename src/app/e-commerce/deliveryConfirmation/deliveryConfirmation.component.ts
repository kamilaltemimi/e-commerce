import { Component, OnInit } from '@angular/core'

import { PaymentConfirmationService } from '../../core/services/paymentConfirmation/paymentConfirmation.service';

import { DeliveryInfo } from '../../core/interfaces/delivery/deliveryInfo.interace';

import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-delivery-confirmation',
    standalone: true,
    imports: [],
    templateUrl: './deliveryConfirmation.component.html',
    styleUrl: './deliveryConfirmation.component.scss'
})

export class DeliveryConfirmationComponent implements OnInit {

    public deliveryInfo!: DeliveryInfo | null

    private unsubscribe$ = new Subject<void>()
    
    constructor(
        private paymentConfirmationService: PaymentConfirmationService
    ) {}

    ngOnInit(): void {
        this.paymentConfirmationService.deliveryInfo$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((deliveryInfo: DeliveryInfo | null) => {
                this.deliveryInfo = deliveryInfo
            })
    }
}