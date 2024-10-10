import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';

import { BasketService } from '../../core/services/basket/basket.service';

import { Product } from '../../core/interfaces/product/product.interface';

@Component({
    selector: 'app-basket',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './basket.component.html',
    styleUrl: './basket.component.scss'
})

export class BasketComponent implements OnInit {

    public basket: Product[] = []

    constructor (
        private basketService: BasketService
    ) {}

    ngOnInit(): void {
        this.fetchProductData()
    }
    
    onChangeQuantity(item: Product, event: Event) {
        const newQuantity = Number((event.target as HTMLSelectElement).value)
        this.basketService.updateItemQuantity(item, newQuantity)
    }
    
    fetchProductData(): void {
        this.basketService.basketData$.subscribe((data: Product[]) => this.basket = data)

    }
}