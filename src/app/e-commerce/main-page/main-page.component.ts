import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'

import { Product } from '../../core/interfaces/product/product.interface'
import { ProductCategory } from '../../core/enums/product-category/product-category.enum'

import { ProductsService } from '../../core/services/products/products.service'

import { Subject, takeUntil } from 'rxjs'

@Component({
    selector: 'app-main-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.scss'
})

export class MainPageComponent implements OnInit, OnDestroy {

    products: Product[] = []
    
    productCategories = Object.values(ProductCategory)

    currentPage = 1
    itemsPerPage = 8
    totalPages = 5

    private unsubscribe$ = new Subject<void>()

    constructor(
        private productsService: ProductsService
    ) {}

    get paginatedProducts(): Product[] {
        if (this.currentPage === 1) {
            return this.products.slice(0, 8)
        } else {
            const startIndex = (this.currentPage - 1) * 8
            const endIndex = this.currentPage * 8
            return this.products.slice(startIndex, endIndex)
        }
    }

    ngOnInit(): void {
        this.getAllProducts()
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }
    
    getAllProducts(): void {
        this.productsService.getAllProducts()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: Product[]) => {
            this.products = data
        })
    }

    selectProduct(product: Product) {
        this.productsService.selectProduct(product)
    }

    previousPage(): void {
        this.currentPage--
    }

    nextPage(): void {
        this.currentPage++
    }

    goToPage(pageNumber: number): void {
        this.currentPage = pageNumber
    }
    
}