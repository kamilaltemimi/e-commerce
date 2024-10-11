import { Component, OnDestroy, OnInit } from '@angular/core'

import { AuthService } from '../../core/services/auth/auth.service';
import { RoutingService } from '../../core/services/routing/routing.service';
import { BasketService } from '../../core/services/basket/basket.service';
import { MobileMenuService } from '../../core/services/mobile-menu/mobile-menu.service';

import { CommonModule } from '@angular/common';

import { MobileMenuComponent } from '../../e-commerce/mobile-menu/mobile-menu.component';

import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, MobileMenuComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit, OnDestroy {

    public basketQuantity: number  = 0
    public mobileMenuActivated = false
    
    private unsubscribe$ = new Subject<void>()

    constructor(
        private authService: AuthService,
        private routingService: RoutingService,
        private basketService: BasketService,
        private mobileMenuService: MobileMenuService
    ) {}

    ngOnInit(): void {
        this.getBasketQuantity()
        this.getMobileMenuStatus()
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
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

    activateMobileMenu(): void {
        this.mobileMenuService.changeMobileMenuStatus()
    }

    getMobileMenuStatus(): void {
        this.mobileMenuService.mobileMenuStatus$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((status: boolean) => {
                this.mobileMenuActivated = status
            })
    }
}