import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../api/interfaces/order/order.interface';
import { OrderService } from '../api/services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: 'order.page.html',
  styleUrls: ['order.page.scss']
})
export class OrderPage implements OnInit {
  orders: Order[];
  type: string;
  fragment: string;

  constructor(private _services: OrderService, private activated: ActivatedRoute) { }

  ngOnInit() {
    this.fragment = 'current';
    this.getOrders()
  }

  ionViewDidEnter() {
    let fragment = this.activated.snapshot.fragment;
    this.fragment = fragment == 'previous' ? fragment : this.fragment;
  }

  getOrders() {
    this.orders = this._services.getAllOrders();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
