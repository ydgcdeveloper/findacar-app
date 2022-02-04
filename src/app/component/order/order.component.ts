import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/api/interfaces/order/order.interface';

@Component({
  selector: 'app-order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  @Input() order: Order;
  constructor() { }

  ngOnInit() { }



}
