import { Injectable } from '@angular/core'

import { Product } from '../../interfaces/product/product.interface'
import { BehaviorSubject } from 'rxjs'

@Injectable({providedIn: 'root'})

export class BasketService {

    private basket: Product[] = []

    private basketQuantity = new BehaviorSubject<number>(0)
    public basketQuantity$ = this.basketQuantity.asObservable()

    private basketBehaviorSubject = new BehaviorSubject<Product[]>(this.basket)
    public basketData$ = this.basketBehaviorSubject.asObservable()

    constructor() {}

    set setBasketData(products: Product[]) {
        this.basket = products
    }

    set setBasketQuantity(value: number) {
        this.basketQuantity.next(value)
    }

    addItem(item: Product): void {
        const existingProductIndex = this.basket.findIndex((product: Product) => product.id === item.id)

        this.basketQuantity.next(this.basketQuantity.value + 1)

        if (existingProductIndex !== -1) {
            this.basket[existingProductIndex].quantity++
        } else {
            this.basket.push(item)
        }
        this.updateLocalStorage()
    }

    updateLocalStorage(): void {
        localStorage.setItem('basket', JSON.stringify(this.basket))
        localStorage.setItem('basketQuantity', JSON.stringify(this.basketQuantity.value))
    }
}