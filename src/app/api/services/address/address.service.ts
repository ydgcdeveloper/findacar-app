import { Injectable } from '@angular/core';
import { Address } from '../../interfaces/address/address.interface';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private addresses: Address[] = [
    {
      id: 1,
      name: "My first Address",
      details: "Alli cerca del rio",
      locationData: {
        name: 'Cuba, Holguin, Holguin',
        latitude: 23.5634826412,
        longitude: 78.2316094,
      },
      selected: false
    },
    {
      id: 2,
      name: "My second Address",
      details: "Alli cerca del rio 2",
      locationData: {
        name: 'Cuba, Granma, Bayamo',
        latitude: 15.5634826412,
        longitude: 56.2316094,
      },
      selected: true,
    },
    {
      id: 3,
      name: "My third Address",
      details: "Alli cerca del rio 3",
      locationData: {
        name: 'Cuba, Matanzas, Jovellanos',
        latitude: 38.5634826412,
        longitude: 8.2316094,
      },
      selected: false
    },
    {
      id: 4,
      name: "My fourth Address",
      details: "Alli cerca del rio 4",
      locationData: {
        name: 'Cuba, Las Tunas, Las Tunas',
        latitude: 23.5634826412,
        longitude: 78.2316094,
      },
      selected: false
    },
  ];

  constructor() { }

  getAddressById(id: number): Address {
    let addresses = this.getAllAddress();
    var foundAddress = addresses.filter((address) => {
      var add = address;
      if (add.id == id) {
        return add;
      }
    });
    return foundAddress[0];
  }

  getAllAddress(): Address[] {
    return this.addresses;
  }

  getSelectedAddressId(): number {
    let addresses = this.getAllAddress();
    var selected = addresses.filter((address) => {
      var add = address;
      if (add.selected) {
        return add;
      }
    });
    return selected[0].id;
  }

  setSelectedAddress(id: number){
    let addresses = this.getAllAddress();
    var selected = addresses.map(function (address) {
      var add = address;
      if (add.id == id) {
        address.selected = true;
      }else{
        address.selected = false;
      }
      return address;
    });
    
    //save selected ones to the server
  }
}
