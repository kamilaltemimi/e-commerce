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

    public productCategories = Object.values(ProductCategory)

    public currentPage = 1
    public totalPages = 5
    private itemsPerPage = 8

    private products: Product[] = []
    private filteredProducts: Product[] = []

    private selectedCategory = ''
    private searchTerm = ''

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

    applyFilters(): void {
        this.filteredProducts = this.products.filter((product: Product) => {
            const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true
            const matchesName = this.searchTerm ? product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true
            return matchesCategory && matchesName
        })
        this.currentPage = 1
        this.calculateTotalPages()
    }

    filterProductsByCategory(category: Event): void {
        this.selectedCategory = (category.target as HTMLSelectElement).value
        this.applyFilters()
    }

    filterProductsByName(nameValue: Event): void {
        this.searchTerm = (nameValue.target as HTMLInputElement).value
        this.applyFilters()
    }

    sortByPrice(event: Event): void {
        const value = (event.target as HTMLSelectElement).value
        switch (value) {
            case 'lowToHigh':
                this.filteredProducts.sort((a, b) => a.price - b.price)
                break
            case 'highToLow':
                this.filteredProducts.sort((a, b) => b.price - a.price)
                break
            default:
            break
        }
    }

    selectProduct(product: Product) {
        this.productsService.selectProduct(product)
    }

    previousPage(): void {
        this.currentPage--
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    nextPage(): void {
        this.currentPage++
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    goToPage(pageNumber: number): void {
        this.currentPage = pageNumber
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    calculateTotalPages(): void {
        const totalItems = this.filteredProducts.length
        this.totalPages = Math.ceil(totalItems / this.itemsPerPage)
    }
}