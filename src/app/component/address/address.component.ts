import { ID } from '../../api/interfaces/rate.interface';
import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AddressService } from '../../api/services/address/address.service';
import { Address } from '../../api/interfaces/address.interface';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  @Output() selectedToUp = new EventEmitter<ID>();
  selected: ID;
  addresses: Address[];

  constructor(
    public actionSheetController: ActionSheetController,
    private router: Router,
    private addressService: AddressService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.addressService.getAddressesByUser().then((value) => {
      console.log(value);
      this.addresses = value;
    });
    setTimeout(() => {
      this.getSelectedAddressId();
      // this.getAddresses();
    }, environment.skeletonTime);
  }

  getSelectedAddressId() {
    this.selected = this.addressService.getSelectedAddressId();
  }

  updateSelected() {
    this.selectedToUp.emit(this.selected);
  }

  getAddresses() {
    this.addresses = this.addressService.getAllAddress();
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
          text: this.translate.instant('address.edit_address'),
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
          text: this.translate.instant('address.delete_address'),
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
