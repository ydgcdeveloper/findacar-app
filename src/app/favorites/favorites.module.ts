import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesPageRoutingModule } from './favorites-routing.module';

import { FavoritesPage } from './favorites.page';
import { ServiceComponentModule } from '../component/service/service.module';
import { ServiceSkeletonComponentModule } from '../component/service-skeleton/service-skeleton.module';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesPageRoutingModule,
    ServiceComponentModule,
    ServiceSkeletonComponentModule
  ],
  declarations: [FavoritesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FavoritesPageModule {}
