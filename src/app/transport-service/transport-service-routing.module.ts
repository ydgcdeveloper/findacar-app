import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportServicePage } from './transport-service.page';

const routes: Routes = [
  {
    path: '',
    component: TransportServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportServicePageRoutingModule {}
