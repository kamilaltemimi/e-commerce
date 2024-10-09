import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from './core/services/auth/auth.service';

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

  isLoggedIn: User | null = null

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedData = JSON.parse(userData)
      this.authService.changeIsLoggedInStatus(parsedData)
    }
    this.authService.isLoggedInObs.subscribe((status: User | null) => {
      this.isLoggedIn = status
    })
  }
}