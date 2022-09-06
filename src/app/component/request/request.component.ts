import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Request } from 'src/app/api/interfaces/request/request.interface';

@Component({
  selector: 'app-request-component',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
   @Input() request: Request;

  constructor(private alertController: AlertController, private translate: TranslateService) { }

  ngOnInit() {}

  async presentAlertConfirmDelete(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'alert-delete-class',
      header: this.translate.instant('button.confirm'),
      message: this.translate.instant('order.delete_request_warning_message'),
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
