import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../api/services/address/address.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {

  selected: number;

  constructor(
    private addressService: AddressService,
    private router: Router,
  )
  { }

  ngOnInit() {
  }

  //take the selected one from the address child component
  setSelected($event) {
    this.selected = $event;
  }

  saveSelected() {
    this.addressService.setSelectedAddress(this.selected);
    this.router.navigate(['tabs/profile']);
  }

  ionViewDidEnter(){
    localStorage.removeItem('address');
  }

}
