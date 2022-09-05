import { AddressService } from './../../../api/services/address/address.service';
import { Address } from './../../../interfaces/address/address.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  public name = '';
  public details = '';
  public address: Address;
  public locationData;
  id;
  show = false;
  editable = false;

  constructor(private activatedRoute: ActivatedRoute, private outlet: IonRouterOutlet, private router: Router, private _service: AddressService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.show = true;
    }, environment.skeleton_time);

    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.address = this._service.getAddressById(id);
      if (this.address) {
        this.id = id;
        this.name = this.address.name;
        this.details = this.address.details;
      }
    } else {
      const address = localStorage.getItem('address');
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
      localStorage.setItem('address', JSON.stringify(this.address));
    }
    this.router.navigate(['map']);
  }

  saveEditAddress() {
    //edit address case
    if (this.id) {
      console.log('edit');
    }
    //add address case
    else {
      console.log('new');
    }
    this.router.navigate(['/addresses']);
  }

}
