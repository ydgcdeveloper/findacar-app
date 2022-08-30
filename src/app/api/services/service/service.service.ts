import { Injectable } from '@angular/core';
import { Service, ServiceStatus } from '../../interfaces/service/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

services: Service [] = [
  {
    id: 1,
    name: 'Carro lijero',
    status: ServiceStatus.NO_DISPONIBLE,
    address: 'Calle 15 #521 % Esta',
    schedule: '10:00-18:30',
    rate: 4.5,
    photo: '../../../assets/images/carga1.jpg',
    pickupTime: '61m'
  },
  {
    id: 2,
    name: 'Taxi',
    status: ServiceStatus.DISPONIBLE,
    address: 'Calle 15 #521 % Esta',
    schedule: '10:00-18:30',
    rate: 4.5,
    photo: '../../../assets/images/carga2.jpg',
    pickupTime: '61m'
  },
  {
    id: 3,
    name: 'Traslado de equipaje',
    status: ServiceStatus.DISPONIBLE,
    address: 'Calle 15 #521 % Esta',
    schedule: '8:00-16:30',
    rate: 4.1,
    photo: '../../../assets/images/carga3.jpg',
    pickupTime: '61m'
  },
  {
    id: 4,
    name: 'Carga pesada',
    status: ServiceStatus.NO_DISPONIBLE,
    address: 'Calle 15 #521 % Esta',
    schedule: '7:00-14:30',
    rate: 4.8,
    photo: '../../../assets/images/carga4.jpg',
    pickupTime: '40m'
  },
];
  constructor() { }

  getAllServices(){
    return this.services;
  }

  getServiceById(id: number) {
    return this.services.filter((service) => service.id == id)[0];
  }
}
