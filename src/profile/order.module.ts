import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderPage } from './order.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { OrderPageRoutingModule } from './order-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: OrderPage }]),
    OrderPageRoutingModule,
  ],
  declarations: [OrderPage]
})
export class OrderPageModule {}
