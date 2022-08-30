import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../api/interfaces/order/order.interface';
import { Request } from '../api/interfaces/request/request.interface';
import { OrderService } from '../api/services/order/order.service';
import { RequestService } from '../api/services/request/request.service';

@Component({
  selector: 'app-order',
  templateUrl: 'order.page.html',
  styleUrls: ['order.page.scss']
})
export class OrderPage implements OnInit {
  orders: Order[];
  requests: Request[];
  type: string;
  fragment: string;

  constructor(private order_services: OrderService, private request_service: RequestService, private activated: ActivatedRoute) { }

  ngOnInit() {
    this.fragment = 'current';
    this.getOrders();
    this.getRequests();
  }

  ionViewDidEnter() {
    const fragment = this.activated.snapshot.fragment;
    this.fragment = fragment == 'previous' ? fragment : this.fragment;
  }

  getOrders() {
    this.orders = this.order_services.getAllOrders();
  }

  getRequests() {
    this.requests = this.request_service.getAllRquests();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
