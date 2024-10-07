import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

@Injectable({providedIn: 'root'})

export class PrivacyNoticeService {

    private privacyNoticeStatus = new BehaviorSubject<boolean>(false)
    public privacyNoticeStatusObs = this.privacyNoticeStatus.asObservable()

    changePrivacyNoticeStatus(): void {
        this.privacyNoticeStatus.next(!this.privacyNoticeStatus.value)
    }

}