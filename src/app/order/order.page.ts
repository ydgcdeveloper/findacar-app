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

  constructor(
    private orderServices: OrderService,
    private requestService: RequestService,
    private activated: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.fragment = 'current';
    this.getOrders();
    // this.getRequests();
    await this.requestService.getRequestsByUser().then((value) => {
      if(value){
        this.requests = (value as unknown) as Array<Request>;
        this.requestService.requestsSubject.subscribe((data) => {
          if(data){
            this.requests = (this.requestService.requests as unknown) as Array<Request>;
          };
        });
      }
    });
  }

  ionViewDidEnter() {
    const fragment = this.activated.snapshot.fragment as string;
    this.fragment = fragment === 'previous' || fragment === 'request' ? fragment : this.fragment;
  }

  getOrders() {
    this.orders = this.orderServices.getAllOrders();
  }

  getRequests() {
    // this.requests = this.requestService.getAllRquests();
  }

  segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
  }

}
