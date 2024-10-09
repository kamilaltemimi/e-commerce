import { Component, OnDestroy, OnInit } from '@angular/core'

import { ProductsService } from '../../core/services/products/products.service';

import { Product } from '../../core/interfaces/product/product.interface';

import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})

export class ProductComponent implements OnInit, OnDestroy {

    selectedProduct: Product | null = null

    private unsubscribe$ = new Subject<void>()

    constructor(
        private productsService: ProductsService
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
        this.productsService.selectedProductObs
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

}