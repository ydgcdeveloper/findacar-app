import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../api/services/address/address.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {

  selected: number;

  constructor(private _service: AddressService) { }

  ngOnInit() {
  }

  //take the selected one from the address child component
  setSelected($event) {
    this.selected = $event;
  }

  saveSelected() {
    this._service.setSelectedAddress(this.selected);
  }

  ionViewDidEnter(){
    localStorage.removeItem('address');
  }

}
