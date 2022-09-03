import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyPageRoutingModule } from './policy-routing.module';

import { PolicyPage } from './policy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicyPageRoutingModule,
    TranslateModule
  ],
  declarations: [PolicyPage]
})
export class PolicyPageModule {}
