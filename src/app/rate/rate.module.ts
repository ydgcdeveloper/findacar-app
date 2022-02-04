import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatePageRoutingModule } from './rate-routing.module';

import { RatePage } from './rate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatePageRoutingModule
  ],
  declarations: [RatePage]
})
export class RatePageModule {}
