import { RequestService } from './../../api/services/request/request.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Request } from 'src/app/api/interfaces/request.interface';

@Component({
  selector: 'app-request-component',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  @Input() request: Request;

  constructor(
    private alertController: AlertController,
    private translate: TranslateService,
    private requestService: RequestService
  ) { }

  ngOnInit() {
    const requestDate = new Date(this.request.date);
    requestDate.setHours(this.request?.datetime.hours);
    requestDate.setMinutes(this.request?.datetime.minutes);
    this.request.date = requestDate;
  }

  async presentAlertConfirmDelete(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'alert-delete-class',
      header: this.translate.instant('button.confirm'),
      message: this.translate.instant('order.delete_request_warning_message'),
      buttons: [
        {
          text: this.translate.instant('button.yes'),
          cssClass: 'danger',
          id: 'delete-button',
          handler: () => {
            this.requestService.deleteRequest(this.request.id);
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
