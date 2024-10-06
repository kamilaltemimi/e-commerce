import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PrivacyNoticeComponent } from '../privacy-notice/privacy-notice.component'

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [CommonModule, PrivacyNoticeComponent],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
})

export class AuthComponent {
    isPrivacyNoticeClicked = false

    switchPrivacyNoticeMode(): void {
        this.isPrivacyNoticeClicked = !this.isPrivacyNoticeClicked
        console.log(this.isPrivacyNoticeClicked)
    }

}