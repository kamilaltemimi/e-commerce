import { Routes } from '@angular/router';
import { MainPageComponent } from './e-commerce/main-page/main-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthComponent } from './e-commerce/auth/auth.component';

export const routes: Routes = [

    { path: '', component: MainPageComponent, canActivate: [AuthGuard]},
    { path: 'auth', component: AuthComponent}

];
