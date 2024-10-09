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
    filteredProducts: Product[] = []
    
    productCategories = Object.values(ProductCategory)

    currentPage = 1
    itemsPerPage = 8
    totalPages = 5

    private unsubscribe$ = new Subject<void>()

    constructor(
        private productsService: ProductsService
    ) {}

    get paginatedProducts(): Product[] {
        const productsToPaginate = this.filteredProducts.length > 0 ? this.filteredProducts : this.products
        const startIndex = (this.currentPage - 1) * this.itemsPerPage
        return productsToPaginate.slice(startIndex, startIndex + this.itemsPerPage)
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
            this.filteredProducts = data
            this.calculateTotalPages()
        })
    }

    filterProducts(category: Event): void {
        const selectedCategory = (category.target as HTMLSelectElement).value
        if (selectedCategory) {
            this.filteredProducts = this.products.filter((product: Product) => product.category === selectedCategory)
        } else {
            this.filteredProducts = this.products
        }
        this.currentPage = 1
        this.calculateTotalPages()
    }

    selectProduct(product: Product) {
        this.productsService.selectProduct(product)
    }

    calculateTotalPages(): void {
        const totalItems = this.filteredProducts.length;
        this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
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