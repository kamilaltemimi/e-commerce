import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

import { DeliveryInfo } from '../../interfaces/delivery/deliveryInfo.interace'

@Injectable({providedIn: 'root'})

export class PaymentConfirmationService {

    private deliveryInfo = new BehaviorSubject<DeliveryInfo | null>(null)
    public deliveryInfo$ = this.deliveryInfo.asObservable()

    set DeliveryInfo(deliveryInfo: DeliveryInfo) {
        this.deliveryInfo.next(deliveryInfo)
    }
}