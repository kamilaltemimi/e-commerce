import { Injectable } from '@angular/core'

import { Product } from '../../interfaces/product/product.interface'

@Injectable({providedIn: 'root'})


export class BasketService {

    constructor() {}

    basket: Product[] = []

    addItem(item: Product): void {
        let existingProductIndex = this.basket.findIndex((product: Product) => product.id === item.id)

        if (existingProductIndex) {
            this.basket[existingProductIndex].quantity!++
        } else {
            this.basket.push({...item, quantity: 1})
        }
        console.log(this.basket)
    }
}