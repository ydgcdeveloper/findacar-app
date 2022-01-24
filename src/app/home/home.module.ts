import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { HomePage } from './home.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { HomePageRoutingModule } from './home-routing.module';
import { CategoryComponent } from '../component/category/category.component';
import { ServiceComponentModule } from '../component/service/service.module';
import { ServiceComponent } from '../component/service/service.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HomePageRoutingModule,
    ServiceComponentModule,
    SwiperModule
  ],
  declarations: [HomePage, CategoryComponent]
})
export class HomePageModule {}
