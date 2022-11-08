import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {
  code = 'YANCODE';

  constructor(
    private clipboard: Clipboard,
    private toastController: ToastController,
    private translate: TranslateService,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
  }

  copyCode() {
    this.clipboard.copy(this.code).then(() => {
      this.presentToast(this.translate.instant('share.toast_copied'));
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      icon: '',
      color: 'dark'
    });
    toast.present();
  }

  async openSocialSharing() {
    // Check if sharing via email is supported
    this.socialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    });

    // Share via email
    this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

}
