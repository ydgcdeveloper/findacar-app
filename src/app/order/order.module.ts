import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderPage } from './order.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { OrderPageRoutingModule } from './order-routing.module';
import { NoResultComponentModule } from '../component/no-result-found/no-result.module';
import { OrderComponent } from '../component/order/order.component';
import { PastOrderComponent } from '../component/past-order/past-order.component';
import { RequestComponent } from '../component/request/request.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: OrderPage }]),
    OrderPageRoutingModule,
    NoResultComponentModule
  ],
  declarations: [OrderPage, OrderComponent, PastOrderComponent, RequestComponent]
})
export class OrderPageModule {}
