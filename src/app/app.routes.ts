import { Routes } from '@angular/router';
import { MainPageComponent } from './e-commerce/main-page/main-page.component';
import { AuthGuard } from './core/guards/auth-guard/auth.guard';
import { AuthComponent } from './e-commerce/auth/auth.component';
import { LoggedInGuard } from './core/guards/logged-in-guard/logged-in.guard';

export const routes: Routes = [

    { path: '', component: MainPageComponent, canActivate: [AuthGuard]},
    { path: 'auth', component: AuthComponent, canActivate: [LoggedInGuard]},
    { path: '**', redirectTo: ''}

];
