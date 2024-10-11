import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

@Injectable({providedIn: 'root'})

export class MobileMenuService {

    private mobileMenuStatus = new BehaviorSubject<boolean>(false)
    public mobileMenuStatus$ = this.mobileMenuStatus.asObservable()

    changeMobileMenuStatus(): void {
        this.mobileMenuStatus.next(!this.mobileMenuStatus.value)
    }
}