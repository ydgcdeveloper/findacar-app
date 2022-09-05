import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressesPageRoutingModule } from './addresses-routing.module';

import { AddressesPage } from './addresses.page';
import { AddressComponent } from '../../component/address/address.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressesPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddressesPage, AddressComponent]
})
export class AddressesPageModule {}
