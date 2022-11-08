import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../api/interfaces/order.interface';
import { Request } from '../api/interfaces/request.interface';
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

  constructor(private orderServices: OrderService, private requestService: RequestService, private activated: ActivatedRoute) { }

  ngOnInit() {
    this.fragment = 'current';
    this.getOrders();
    this.getRequests();
  }

  ionViewDidEnter() {
    const fragment = this.activated.snapshot.fragment;
    this.fragment = fragment as string === 'previous' ? fragment : this.fragment;
  }

  getOrders() {
    this.orders = this.orderServices.getAllOrders();
  }

  getRequests() {
    this.requests = this.requestService.getAllRquests();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
