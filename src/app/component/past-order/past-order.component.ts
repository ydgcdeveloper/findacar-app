import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Order } from 'src/app/api/interfaces/order.interface';

@Component({
  selector: 'app-past-order-component',
  templateUrl: './past-order.component.html',
  styleUrls: ['./past-order.component.scss'],
})
export class PastOrderComponent implements OnInit {

  @Input() order: Order;
  constructor() { }

  ngOnInit() {}


}
