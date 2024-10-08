import { Component } from '@angular/core'

import { AuthService } from '../../core/services/auth/auth.service';
import { RoutingService } from '../../core/services/routing/routing.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})

export class HeaderComponent {

    constructor(
        private authService: AuthService,
        private routingService: RoutingService
    ) {}

    navigate(path: string): void {
        this.routingService.navigate(path)
    }

    logout(): void {
        this.authService.logout()
    }
}