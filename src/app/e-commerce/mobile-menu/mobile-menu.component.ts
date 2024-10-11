import { Component } from '@angular/core'

import { RoutingService } from '../../core/services/routing/routing.service';
import { MobileMenuService } from '../../core/services/mobile-menu/mobile-menu.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
    selector: 'app-mobile-menu',
    standalone: true,
    imports: [],
    templateUrl: './mobile-menu.component.html',
    styleUrl: './mobile-menu.component.scss'
})

export class MobileMenuComponent {

    constructor(
        private routingService: RoutingService,
        private mobileMenuService: MobileMenuService,
        private authService: AuthService
    ) {}

    navigate(path: string) {
        this.mobileMenuService.changeMobileMenuStatus()
        this.routingService.navigate(path)
    }

    logout(): void {
        this.authService.logout()
        this.mobileMenuService.changeMobileMenuStatus()
    }
}