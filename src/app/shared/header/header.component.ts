import { Component, OnInit } from '@angular/core'

import { AuthService } from '../../core/services/auth/auth.service';
import { RoutingService } from '../../core/services/routing/routing.service';
import { BasketService } from '../../core/services/basket/basket.service';

import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {

    public basketQuantity: number  = 0

    constructor(
        private authService: AuthService,
        private routingService: RoutingService,
        private basketService: BasketService
    ) {}

    ngOnInit(): void {
        this.getBasketQuantity()
    }

    getBasketQuantity(): void {
        this.basketService.basketQuantity$.subscribe((value: number) => {
            this.basketQuantity = value
        })
    }

    navigate(path: string): void {
        this.routingService.navigate(path)
    }

    logout(): void {
        this.authService.logout()
    }
}