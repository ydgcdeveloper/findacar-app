import { TransportRepoService } from './../../repos/transport/transport-repo.service';
import { Injectable } from '@angular/core';
import { Service, ServiceStatus } from '../../interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

transportServices: Service [] = [
  // {
  //   id: 1,
  //   name: 'Carro ligero',
  //   status: ServiceStatus.NO_DISPONIBLE,
  //   address: 'Calle 15 #521 % Esta',
  //   schedule: '10:00-18:30',
  //   rate: 4.5,
  //   photo: '../../../assets/images/carga1.jpg',
  //   pickupTime: '61m'
  // },
  // {
  //   id: 2,
  //   name: 'Taxi',
  //   status: ServiceStatus.DISPONIBLE,
  //   address: 'Calle 15 #521 % Esta',
  //   schedule: '10:00-18:30',
  //   rate: 4.5,
  //   photo: '../../../assets/images/carga2.jpg',
  //   pickupTime: '61m'
  // },
  // {
  //   id: 3,
  //   name: 'Traslado de equipaje',
  //   status: ServiceStatus.DISPONIBLE,
  //   address: 'Calle 15 #521 % Esta',
  //   schedule: '8:00-16:30',
  //   rate: 4.1,
  //   photo: '../../../assets/images/carga3.jpg',
  //   pickupTime: '61m'
  // },
  // {
  //   id: 4,
  //   name: 'Carga pesada',
  //   status: ServiceStatus.NO_DISPONIBLE,
  //   address: 'Calle 15 #521 % Esta',
  //   schedule: '7:00-14:30',
  //   rate: 4.8,
  //   photo: '../../../assets/images/carga4.jpg',
  //   pickupTime: '40m'
  // },
];
  constructor(private transportRepo: TransportRepoService) { }

  async getTransportServices(){
    try {
      const transportResponse = await this.transportRepo.getTransportServices();
      if (!transportResponse.errors) {
        const categoriesData = transportResponse.data.getTransportServices;
        this.transportServices = categoriesData;
        return categoriesData;
      }
    } catch (error) {
      console.log(error);
    }
  }

  getServiceById(id: number) {
    return this.transportServices.filter((service) => service.id as number === id)[0];
  }
}
