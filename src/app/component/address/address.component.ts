import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  public show = false;
  selected = 'address';

  constructor(public actionSheetController: ActionSheetController, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.show = true;
    }, environment.SKELETON_TIME)
  }

  showT() {
    this.presentActionSheet();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'address-sheet',
      buttons: [
        {
          text: 'Editar dirección',
          role: 'destructive',
          icon: 'create',
          id: 'delete-button',
          cssClass: 'button-sheet',
          data: {
            type: 'edit'
          },
          handler: () => {
            this.router.navigate(['/add-address', 2])
          }
        }, {
          text: 'Eliminar dirección',
          icon: 'trash',
          data: 10,
          handler: () => {
            console.log('Trash clicked' + this.selected);
          }
        }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
}
