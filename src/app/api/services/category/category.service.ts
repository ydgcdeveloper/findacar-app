import { Category } from 'src/app/api/interfaces/category.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categories: Category[] = [
    {
      id: 1,
      name: 'Carga pesada',
      color: 'red',
      description: '',
      photo: `../../../assets/icon/heavy-96.png`,
    },
    {
      id: 2,
      name: 'Equipos pesados',
      color: 'blue',
      description: 'Carga y transporte de electrodomesticos hasta 1T',
      photo: `../../../assets/images/car-motor.png`,
    },
    {
      id: 3,
      name: 'Mudanza',
      color: 'green',
      description: 'Para mudanza en todo el país',
      photo: `../../../assets/icon/heavy-green-96.png`,
    },
    {
      id: 4,
      name: 'Mototaxi',
      color: 'brown',
      description: 'Recogida y transporte de personal a lugares publicos',
      photo: `../../../assets/icon/motorcycle-green-96.png`,
    },
    {
      id: 5,
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
