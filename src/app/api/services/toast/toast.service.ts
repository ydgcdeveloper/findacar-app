import { ToastController, ToastOptions } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async showToast(toastOption: { message: string; header?: string; color?: ToastColors; position?: ToastPositions; icon?: string }) {
    const toast = await this.toastCtrl.create({
      message: toastOption.message,
      header: toastOption.header,
      color: toastOption.color,
      position: toastOption.position,
      icon: toastOption.icon,
      duration: 3000,
      animated: true,
    });

    toast.present();
  }
}

export enum ToastColors {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PRIMARY = 'primary',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SECONDARY = 'secondary',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TERTIARY = 'tertiary',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SUCCESS = 'success',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  WARNING = 'warning',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DANGER = 'danger',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  LIGHT = 'light',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  MEDIUM = 'medium',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DARK = 'dark',
}

export enum ToastPositions {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  BOTTOM = 'bottom',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  MIDDLE = 'middle',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TOP = 'top',
}
