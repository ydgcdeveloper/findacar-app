import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: 'order.page.html',
  styleUrls: ['order.page.scss']
})
export class OrderPage implements OnInit {

  type: string;
  constructor() { }

  ngOnInit() {
    this.type = 'current';
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
