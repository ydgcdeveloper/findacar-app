import { ToastColors } from './../../api/services/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public loader: HTMLIonLoadingElement;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private translate: TranslateService,
    private loadingController: LoadingController
  ) { }

  async showAlert(header: string = 'Error', message: string) {
    const alert = await this.alertController.create({
      header,
      message,
    });

    await alert.present();
  }

  async showErrorMsg(error: any) {

    console.log(error);
    const headerText = this.translate.instant('common.error');

    const msgText = this.translate.instant(
      ['Invalid email/password', 'Inactive user account', 'Email not verified'].includes(error.message) ? 
      'common.error_message.invalid_credentials' :
        (error.message as string).includes('Unknown Error') ? 'common.error_message.unknown' :
          error.message === 'Email is already verified' ? 'common.error_message.email_already_verified' :
            error.message === 'Wrong pin' ? 'verify_email.wrong_pin_message' :
            error.message === 'Email already used' ? 'common.error_message.email_already_in_use' : 'common.error_message.unknown'
    );
    const toast = await this.toastController.create({
      header: headerText,
      message: msgText,
      icon: 'close-circle-outline',
      cssClass: 'custom-toast-error',
      duration: 4500,
      position: 'top',
      animated: true,
    });
    await toast.present();
  }

  async showMessage(messageType: MessageType, message: string) {

    const headerText = await this.translate.instant(`common.message.${messageType}`);

    const color = messageType === MessageType.INFO ? ToastColors.PRIMARY : messageType;
    const icon = messageType === MessageType.INFO ? 'information-circle-outline' : messageType === MessageType.SUCCESS ? 'checkmark-circle-outline' : 'warning-outline';

    const toast = await this.toastController.create({
      header: headerText,
      message,
      icon,
      cssClass: 'custom-toast',
      duration: 3500,
      position: 'top',
      animated: true,
      color
    });

    await toast.present();
  }

  async showLoader() {
    this.loader = await this.loadingController.create({
      message: '',
      spinner: 'bubbles'
    });
    await this.loader.present();
  }

  async hideLoader() {
    await this.loader.dismiss();
  }
}

export enum MessageType {
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
}
