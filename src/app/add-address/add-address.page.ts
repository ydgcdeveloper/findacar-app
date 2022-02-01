import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Address } from '../api/interfaces/address/address.interface';
import { AddressService } from '../api/services/address/address.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  public name: string = '';
  public details: string = '';
  public address: Address;
  public locationData;
  id;
  show: boolean = false;
  editable: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private outlet: IonRouterOutlet, private router: Router, private _service: AddressService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.show = true;
    }, environment.SKELETON_TIME)

    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.address = this._service.getAddressById(id)
      if (this.address) {
        this.id = id;
        this.name = this.address.name;
        this.details = this.address.details;
      }
    } else {
      let address = localStorage.getItem('address');
      if (address) {
        this.address = JSON.parse(address);
        this.name = this.address.name;
        this.details = this.address.details;
      }
    }

    this.editable = this.id ? true : false;
  }

  navigate() {
    if (this.address) {
      localStorage.removeItem('address');
      localStorage.setItem('address', JSON.stringify(this.address))
      console.log('navigate in ', this.address);
    }
    this.router.navigate(['map'])
  }

  saveEditAddress() {
    //edit address case
    if (this.id) {
      console.log("edit");
    }
    //add address case
    else {
      console.log("new");
    }
    this.router.navigate(['/addresses'])
  }

}
