import { Injectable } from '@angular/core'

import { Product } from '../../interfaces/product/product.interface'

import { BehaviorSubject } from 'rxjs'

@Injectable({providedIn: 'root'})

export class BasketService {

    private basketQuantity = new BehaviorSubject<number>(0)
    public basketQuantity$ = this.basketQuantity.asObservable()

    private basketBehaviorSubject = new BehaviorSubject<Product[]>([])
    public basketData$ = this.basketBehaviorSubject.asObservable()

    constructor() {}

    set setBasketData(products: Product[]) {
        this.basketBehaviorSubject.next(products)
    }

    set setBasketQuantity(value: number) {
        this.basketQuantity.next(value)
    }

    addItem(item: Product): void {
        const basket = [...this.basketBehaviorSubject.value]
        const existingProductIndex = this.basketBehaviorSubject.value.findIndex((product: Product) => product.id === item.id)

        if (existingProductIndex !== -1) {
            basket[existingProductIndex] = {...basket[existingProductIndex], quantity: basket[existingProductIndex].quantity + 1}
        } else {
           basket.push(item)
        }
        this.basketQuantity.next(this.basketQuantity.value + 1)
        this.basketBehaviorSubject.next(basket)
        this.updateLocalStorage()
    }

    updateItemQuantity(item: Product, newQuantity: number) {
        const basket = [...this.basketBehaviorSubject.value]
        const updatedItemIndex = basket.findIndex((product: Product) => product.id === item.id)

        if (updatedItemIndex !== -1) {
            this.basketQuantity.next(this.basketQuantity.value - basket[updatedItemIndex].quantity + newQuantity)
            basket[updatedItemIndex].quantity = newQuantity
            this.basketBehaviorSubject.next(basket)
        }
        this.updateLocalStorage()
    }

    updateLocalStorage(): void {
        localStorage.setItem('basket', JSON.stringify(this.basketBehaviorSubject.value))
        localStorage.setItem('basketQuantity', JSON.stringify(this.basketQuantity.value))
    }
}