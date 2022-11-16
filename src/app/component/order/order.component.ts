import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Order } from 'src/app/api/interfaces/order.interface';

@Component({
  selector: 'app-order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  @Input() order: Order;
  constructor(private alertController: AlertController, private translate: TranslateService) { }

  ngOnInit() { }


  async presentAlertConfirmDelete(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'alert-delete-class',
      header: this.translate.instant('button.confirm'),
      message: this.translate.instant('order.delete_order_warning_message'),
      buttons: [
        {
          text: this.translate.instant('button.yes'),
          cssClass: 'danger',
          id: 'delete-button',
          handler: () => {
            console.log('Confirm Delete');
          }
        },
        {
          text: this.translate.instant('button.no'),
          role: 'cancel',
          cssClass: 'secondary backblack',
          id: 'cancel-button',
        }
      ]
    });

    await alert.present();
  }

}
