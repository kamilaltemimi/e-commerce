import { Component } from '@angular/core'
import { PrivacyNoticeService } from '../../core/services/privacy-notice/privacy-notice.service';

@Component({
    selector: 'app-privacy-notice',
    standalone: true,
    imports: [],
    templateUrl: './privacy-notice.component.html',
    styleUrl: './privacy-notice.component.scss'
})

export class PrivacyNoticeComponent {

    constructor(
        private privacyNoticeService: PrivacyNoticeService
    ) {}

    closePrivacyNotice(): void {
        this.privacyNoticeService.changePrivacyNoticeStatus()
    }
}