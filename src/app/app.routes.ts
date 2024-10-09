import { Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth-guard/auth.guard';
import { LoggedInGuard } from './core/guards/logged-in-guard/logged-in.guard';

import { MainPageComponent } from './e-commerce/main-page/main-page.component';
import { AuthComponent } from './e-commerce/auth/auth.component';
import { BasketComponent } from './e-commerce/basket/basket.component';
import { CheckoutComponent } from './e-commerce/checkout/checkout.component';
import { ContactComponent } from './e-commerce/contact/contact.component';
import { FaqComponent } from './e-commerce/FAQ/faq.component';
import { ProductComponent } from './e-commerce/product/product.component';

export const routes: Routes = [

    { path: '', component: MainPageComponent, canActivate: [AuthGuard]},
    { path: 'auth', component: AuthComponent, canActivate: [LoggedInGuard]},
    { path: 'basket', component: BasketComponent, canActivate: [AuthGuard]},
    { path: 'basket/checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
    { path: 'contact', component: ContactComponent, canActivate: [AuthGuard]},
    { path: 'FAQ', component: FaqComponent, canActivate: [AuthGuard]},
    { path: 'product/:id', component: ProductComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: ''}

];
