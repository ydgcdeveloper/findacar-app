import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

  constructor() {    
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {


  }

}
