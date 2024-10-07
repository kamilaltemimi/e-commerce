import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedData = JSON.parse(userData)
      this.authService.changeIsLoggedInStatus(parsedData)
    }
  }

}
