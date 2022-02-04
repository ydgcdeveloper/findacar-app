import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Request } from 'src/app/api/interfaces/request/request.interface';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
   @Input() request: Request

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  async presentAlertConfirmDelete(id:number) {
    const alert = await this.alertController.create({
      cssClass: 'alert-delete-class',
      header: 'Confirmar',
      message: 'Está seguro que desea eliminar la solicitud?',
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
