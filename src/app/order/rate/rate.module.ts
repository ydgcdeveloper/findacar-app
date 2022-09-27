import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatePageRoutingModule } from './rate-routing.module';

import { RatePage } from './rate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatePageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [RatePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RatePageModule {}
