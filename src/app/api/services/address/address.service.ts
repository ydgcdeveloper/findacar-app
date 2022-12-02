import { from } from 'rxjs';
import { AddressInput } from './../../models/address.input';
import { AddressRepoService } from './../../repos/address/address-repo.service';
import { ID } from '../../interfaces/rate.interface';
import { Injectable } from '@angular/core';
import { Address } from '../../interfaces/address.interface';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  public addresses: Address[] = [];

  constructor(private addressRepo: AddressRepoService) { }

  async getAddressById(id: number): Promise<Address> {
    try {
      const addressResponse = await this.addressRepo.getAddressById(id);
      if (!addressResponse.errors) {
        const address = addressResponse.data.getAddressById;
        return address;
      }
    } catch (error) {
      console.log(error);
    }
  }

  getAllAddress(): Address[] {
    return this.addresses;
  }

  async getAddressesByUser(): Promise<Address[]> {
    try {
      const addressResponse = await this.addressRepo.getAddressesByUser();
      if (!addressResponse.errors) {
        const addressesByUser = addressResponse.data.getAddressesByUser;
        this.addresses = addressesByUser;
        return addressesByUser;
      }
    } catch (error) {
      console.log(error);
    }
  }

  addAddress(addressInput: AddressInput) {
    return new Promise((resolve, reject) => {
      from(this.addressRepo.addAddress(addressInput)).subscribe(
        {
          next: (updatedData) => {
            console.log(updatedData);
            resolve(true);
          },
          error: (error) => {
            reject(error);
          }
        }
      );
    });
  }

  getSelectedAddressId(): ID {
    const addresses = this.getAllAddress();
    if (!addresses.length) {
      return -1;
    }
    return addresses.find((address) => {
      if (address.selected) {
        return address;
      }
    })?.id;
  }

  getSelectedAddress(): Address | null {
    const addresses = this.getAllAddress();
    const selected = addresses.filter((address) => {
      const add = address;
      if (add.selected) {
        return add;
      }
    });
    return selected ? selected[0] : null;
  }

  setSelectedAddress(id: number) {
    return new Promise((resolve, reject) => {
      from(this.addressRepo.setSelectedAddress(id)).subscribe(
        {
          next: (selectedAddress) => {
            console.log(selectedAddress);
            resolve(true);
          },
          error: (error) => {
            reject(error);
          }
        }
      );
    });
    // const addresses = this.getAllAddress();
    // const selected = addresses.map((address) => {
    //   const add = address;
    //   if (add.id as string | number === id) {
    //     address.selected = true;
    //   } else {
    //     address.selected = false;
    //   }
    //   return address;
    // });

    //save selected ones to the server
  }

  // addAddress(address: Address) {
  //   this.addresses.push(address);
  // }

  saveAddress(address: Address) {
    console.log(address);
    this.addresses[this.addresses.findIndex((add) => add.id === address.id)] = address;
  }
}
