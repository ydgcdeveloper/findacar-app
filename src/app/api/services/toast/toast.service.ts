import { ToastController, ToastOptions } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async showToast(ToastOption: { message: string, header?: string, color?: ToastColors, position?: ToastPositions, icon?: string }) {
    let toast = await this.toastCtrl.create({
      message: ToastOption.message,
      header: ToastOption.header,
      color: ToastOption.color,
      position: ToastOption.position,
      icon: ToastOption.icon,
      duration: 3000,
      animated: true,
    });

    toast.present();
  }
}

export enum ToastColors {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
  LIGHT = 'light',
  MEDIUM = 'medium',
  DARK = 'dark',
}

export enum ToastPositions {
  BOTTOM = 'bottom',
  MIDDLE = 'middle',
  TOP = 'top',
}
