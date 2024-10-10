import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from './core/services/auth/auth.service';
import { BasketService } from './core/services/basket/basket.service';

import { HeaderComponent } from './shared/header/header.component';

import { User } from './core/interfaces/user/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  public isLoggedIn: User | null = null

  constructor(
    private authService: AuthService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.getLocalStorage()
  }

  getLocalStorage(): void {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedData = JSON.parse(userData)
      this.authService.changeIsLoggedInStatus(parsedData)
    }
    this.authService.isLoggedIn$.subscribe((status: User | null) => {
      this.isLoggedIn = status
    })

    const basketData = localStorage.getItem('basket')
    if (basketData) {
      const parsedBasketData = JSON.parse(basketData)
      this.basketService.BasketData = parsedBasketData
    }

    const basketQuantity = localStorage.getItem('basketQuantity')
    if (basketQuantity) {
      this.basketService.BasketQuantity = JSON.parse(basketQuantity)
    }
  }
}