import { Injectable } from '@angular/core';
import { Category } from 'src/app/interface/category.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public categories: Category[] = [
    {
      name: 'Carga pesada',
      color: 'red',
      description: '',
      photo: `../../../assets/icon/heavy-96.png`,
    },
    {
      name: 'Equipos pesados',
      color: 'blue',
      description: 'Carga y transporte de electrodomesticos hasta 1T',
      photo: `../../../assets/images/car-motor.png`,
    },
    {
      name: 'Mudanza',
      color: 'green',
      description: 'Para mudanza en todo el país',
      photo: `../../../assets/icon/heavy-green-96.png`,
    },
    {
      name: 'Mototaxi',
      color: 'brown',
      description: 'Recogida y transporte de personal a lugares publicos',
      photo: `../../../assets/icon/motorcycle-green-96.png`,
    },
    {
      name: 'Taxi',
      color: 'yellow',
      description: 'Recogida y transporte de personal a lugares especificos',
      photo: `../../../assets/icon/taxi_96.png`,
    }
  ];


  constructor() { }

  getCategories(){
    return this.categories;
  }
}
