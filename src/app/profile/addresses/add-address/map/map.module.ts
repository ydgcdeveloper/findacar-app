import { TranslateModule } from '@ngx-translate/core';
import { ModalPlacesComponent } from './../../../../component/modal-places/modal-places.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    TranslateModule,
    TranslateModule
  ],
  declarations: [MapPage, ModalPlacesComponent]
})
export class MapPageModule {}
