import { Component, OnDestroy, OnInit } from '@angular/core'

import { ProductsService } from '../../core/services/products/products.service';
import { BasketService } from '../../core/services/basket/basket.service';

import { Product } from '../../core/interfaces/product/product.interface';

import { Subject, takeUntil } from 'rxjs';

import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})

export class ProductComponent implements OnInit, OnDestroy {

    public selectedProduct: Product | null = null
    public purchaseMessage = false
    
    private unsubscribe$ = new Subject<void>()

    constructor(
        private productsService: ProductsService,
        private basketService: BasketService
    ) {}

    ngOnInit(): void {
        this.getSelectedProductsInCaseOfRefreshingPage()
        this.getSelectedProductData()
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

    getSelectedProductData(): void {
        this.productsService.selectedProduct$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: Product | null) => {
            this.selectedProduct = data
        })
    }

    getSelectedProductsInCaseOfRefreshingPage(): void {
        const storedProduct = localStorage.getItem('selectedProduct')
        
        if (storedProduct) {
            const product = JSON.parse(storedProduct)
            this.productsService.selectProduct(product)
        }
    }

    addToBasket(product: Product): void {
        this.basketService.addItem({...product, quantity: 1})

        this.purchaseMessage = true
        setTimeout(() => {
            this.purchaseMessage = false
        }, 5000)
    }
}