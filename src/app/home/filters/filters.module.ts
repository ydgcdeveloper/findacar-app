import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltersPageRoutingModule } from './filters-routing.module';

import { FiltersPage } from './filters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltersPageRoutingModule,
    TranslateModule
  ],
  declarations: [FiltersPage]
})
export class FiltersPageModule {}
