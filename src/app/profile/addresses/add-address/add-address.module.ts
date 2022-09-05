import { TranslateModule } from '@ngx-translate/core';
import { AddressService } from './../../../api/services/address/address.service';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAddressPageRoutingModule } from './add-address-routing.module';

import { AddAddressPage } from './add-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAddressPageRoutingModule,
    TranslateModule
  ],
  providers:[AddressService],
  declarations: [AddAddressPage]
})
export class AddAddressPageModule{


}
