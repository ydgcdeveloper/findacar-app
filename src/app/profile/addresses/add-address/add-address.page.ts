import { ViewWillEnter } from '@ionic/angular';
import { CommonService } from './../../../services/common/common.service';
import { AddressInput } from './../../../api/models/address.input';
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
export class AddAddressPage implements OnInit, ViewWillEnter {

  public address: Address;
  public locationData;
  id;
  show = false;
  editable = false;
  addressForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    private readonly addressService: AddressService,
    private formBuilder: FormBuilder
  ) { }

  get name() {
    return this.addressForm.get('name');
  }

  get location() {
    return this.addressForm.get('location');
  }

  get details() {
    return this.addressForm.get('details');
  }

  get description() {
    return this.addressForm.get('description');
  }

  async ngOnInit() {
    setTimeout(() => {
      this.show = true;
    }, environment.skeletonTime);

    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    if (id) {
      this.address = await this.addressService.getAddressById(id);
      if (this.address) {
        this.id = id;
      }
    } else {
      const address = localStorage.getItem('address');
      if (address) {
        this.address = JSON.parse(address);
      }
    }

    console.log('ID ---->>>', id);
    this.editable = this.id !== undefined ? true : false;
    this.setForm(this.address);
  }

  ionViewWillEnter(): void {
    const address = JSON.parse(localStorage.getItem('address'));
    if (address) {
      this.location.setValue(address.locationData);
    }
  }

  setForm(address: Address) {
    this.addressForm = this.formBuilder.group({
      name: [address?.name, [Validators.required, Validators.minLength(2)]],
      //* Next version comment
      // location: [address?.locationData, [Validators.required]],
      //* Next version comment
      //^ Current version comment
      description: [address?.description, [Validators.required]],
      //^ Current version comment
      //* Next version comment
      // details: [address?.details],
      //* Next version comment
    });
  }

  navigate() {
    if (this.address) {
      localStorage.removeItem('address');
      localStorage.setItem('address', JSON.stringify(this.address));
    }
    this.router.navigate(['map']);
  }

  async onSubmit() {

    if (this.addressForm.valid) {
      const address: AddressInput = {
        name: this.name.value,
        //* Next version comment
        // details: this.details.value,
        // locationData: this.location.value
        //* Next version comment
        description: this.description.value,
      };

      try {
        await this.commonService.showLoader();
        //edit address case
        if (this.id) {

        }
        //add address case
        else {
          await this.addressService.addAddress(address).then(async (value) => {
            if (value) {
              // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['addresses']);
              // });
            }
          });
        }
      } catch (error) {
        this.commonService.showErrorMsg(error);
      } finally {
        await this.commonService.hideLoader();
      }
    }
  }

}
