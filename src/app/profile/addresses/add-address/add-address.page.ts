import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddressService } from './../../../api/services/address/address.service';
import { Address } from './../../../interfaces/address/address.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  public address: Address;
  public locationData;
  id;
  show = false;
  editable = false;
  addressForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    setTimeout(() => {
      this.show = true;
    }, environment.skeleton_time);

    const id = parseInt(await this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.address = this.addressService.getAddressById(id);
      if (this.address) {
        this.id = id;
      }
    } else {
      const address = localStorage.getItem('address');
      if (address) {
        this.address = JSON.parse(address);
      }
    }

    console.log("ID ---->>>" , this.id)
    this.editable = this.id !== undefined ? true : false;
    this.setForm(this.address)
  }

  get name() {
    return this.addressForm.get('name')
  }

  get location() {
    return this.addressForm.get('location')
  }

  get details() {
    return this.addressForm.get('details')
  }

  setForm(address: Address) {
    this.addressForm = this.formBuilder.group({
      name: [address?.name, [Validators.required, Validators.minLength(2)]],
      location: [address?.locationData, [Validators.required]],
      details: [address?.details],
    });
  }

  navigate() {
    if (this.address) {
      localStorage.removeItem('address');
      localStorage.setItem('address', JSON.stringify(this.address));
    }
    this.router.navigate(['map']);
  }

  onSubmit() {

    const newAddress = {
      id: this.id !== undefined ? this.id : this.addressService.getAllAddress().length + 1,
      name: this.name.value,
      details: this.details.value,
      locationData: this.location.value
    }

    //edit address case
    if (this.id) {
      this.addressService.saveAddress({...newAddress, selected: this.address.selected})
    }
    //add address case
    else {
      this.addressService.addAddress({ ...newAddress, selected: false })
    }
    this.router.navigate(['/addresses']);
  }

}
