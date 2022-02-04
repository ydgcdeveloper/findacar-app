import { Component, OnInit } from '@angular/core';
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
  constructor(private _services: OrderService) { }

  ngOnInit() {
    this.type = 'current';
    this.getOrders()
  }

  getOrders() {
    this.orders = this._services.getAllOrders();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
