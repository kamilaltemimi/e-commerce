import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from '../../interfaces/product/product.interface';

import { RoutingService } from '../routing/routing.service';

@Injectable({providedIn: 'root'})

export class ProductsService {

    private selectedProduct = new BehaviorSubject<Product | null>(null)
    public selectedProduct$ = this.selectedProduct.asObservable()

    private URL = 'assets/data/products.json'

    constructor(
        private http: HttpClient,
        private routingService: RoutingService
    ) {}

    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.URL)
    }

    selectProduct(product: Product): void {
        this.selectedProduct.next(product)
        this.routingService.navigate(`product/${product.name}`)
        localStorage.setItem('selectedProduct', JSON.stringify(product))
    }
}