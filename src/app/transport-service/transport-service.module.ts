import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportServicePageRoutingModule } from './transport-service-routing.module';

import { TransportServicePage } from './transport-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportServicePageRoutingModule
  ],
  declarations: [TransportServicePage]
})
export class TransportServicePageModule {}
