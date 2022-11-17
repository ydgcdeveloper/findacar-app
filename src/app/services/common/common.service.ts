import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { AlertController , ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public loader: HTMLIonLoadingElement

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private translate: TranslateService,
    private loadingController: LoadingController
  ) { }

  async showAlert(header: string = "Error", message: string) {
    const alert = await this.alertController.create({
      header,
      message,
    })

    await alert.present();
  }

  async showErrorMsg(error: any) {

    const headerText = this.translate.instant('common.error');

    const msgText = this.translate.instant(
      error.message === "Invalid email/password" || "Inactive user account" || "Email not verified" ? 'common.error_message.invalid_credentials' : 
      (error.message as string).includes('Unknown Error') ?  'common.error_message.unknown' :
      error.message === "Email is already verified" ?  "common.error_message.email_already_verified": "common.error_message.unknown"
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

  async showMessage(){

  }

  async showLoader() {
    this.loader = await this.loadingController.create({
      message: '',
      spinner: 'bubbles'
    });
    await this.loader.present();
  }

  async hideLoader(){
    await this.loader.dismiss()
  }

}