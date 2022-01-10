import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  public show = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.show = true;
    }, 2000)
  }

}
