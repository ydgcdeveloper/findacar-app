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
    console.log(this.selected);
    this.addressService.setSelectedAddress(this.selected as number).then((value) => {
      if(value){
        this.router.navigate(['tabs/profile']);
      }
    });
  }

  checkSameSelected(): boolean{
    const currentSelected = this.addressService.getSelectedAddressId();
    return currentSelected as number === this.selected;
  }

  ionViewDidEnter(){
    localStorage.removeItem('address');
  }

}
