import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesPageRoutingModule } from './favorites-routing.module';

import { FavoritesPage } from './favorites.page';
import { ServiceComponent } from '../component/service/service.component';
import { ServiceComponentModule } from '../component/service/service.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesPageRoutingModule,
    ServiceComponentModule
  ],
  declarations: [FavoritesPage]
})
export class FavoritesPageModule {}
