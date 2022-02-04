import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Order } from 'src/app/api/interfaces/order/order.interface';

@Component({
  selector: 'app-past-order',
  templateUrl: './past-order.component.html',
  styleUrls: ['./past-order.component.scss'],
})
export class PastOrderComponent implements OnInit {

  @Input() order: Order;
  constructor(public alertController: AlertController) { }

  ngOnInit() {}

  async presentAlertConfirmDelete(id:number) {
    console.log('fsdfdf');
    const alert = await this.alertController.create({
      cssClass: 'alert-delete-class',
      header: 'Confirmar',
      message: 'Está seguro que desea eliminar la orden?',
      buttons: [
        {
          text: 'Si',
          cssClass: 'danger',
          id: 'delete-button',
          handler: () => {
            console.log('Confirm Delete');
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary backblack',
          id: 'cancel-button',
        }
      ]
    });

    await alert.present();
  }

}
