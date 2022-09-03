import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AddressService } from '../../api/services/address/address.service';
import { Address } from '../../api/interfaces/address/address.interface';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  selected: number;
  @Output() selectedToUp = new EventEmitter<number>();
  addresses: Address[];

  constructor(public actionSheetController: ActionSheetController, private router: Router, private _service: AddressService) { }

  ngOnInit() {
    setTimeout(() => {
      this.getSelectedAddressId();
      this.getAddresses();
    }, environment.skeleton_time);
  }

  getSelectedAddressId() {
    this.selected = this._service.getSelectedAddressId();
  }

  updateSelected() {
    this.selectedToUp.emit(this.selected);
  }

  getAddresses() {
    this.addresses = this._service.getAllAddress();
  }


  showAction(id: number) {
    this.presentActionSheet(id);
  }

  showSelected() {
    this.selected = this.selected;
    console.log(this.selected);
  }

  async presentActionSheet(id) {
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
            this.router.navigate(['/add-address', id]);
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
