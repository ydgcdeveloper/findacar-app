import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { AlertController , ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private translate: TranslateService,
    // private loadingController: LoadingController
  ) { }

  async showAlert(header: string = "Error", message: string) {
    const alert = await this.alertController.create({
      header,
      message,
    })

    await alert.present();
  }

  async showErrorMsg(error: any) {
    console.log(error.message);

    const headerText = this.translate.instant('common.error');

    const msgText = this.translate.instant(
      error.message === "Invalid email/password" ? 'common.error_message.invalid_credentials' : 
      (error.message as string).includes('Unknown Error') ?  'common.error_message.unknown' : 'common.error_message.unknown'
    );
    const toast = await this.toastController.create({
      header: headerText,
      message: msgText,
      icon: 'close-circle-outline',
      cssClass: 'custom-toast',
      duration: 4500,
      position: 'top',
      animated: true,
    });
    await toast.present();
  }

  // async showLoader() {
  //   const loading = await this.loadingController.create({
  //     message: await this.translate.get('global.label.loading').toPromise()
  //   });
  //   await loading.present();
  // }

}