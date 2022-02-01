import { Component, OnInit } from '@angular/core';
import { Service, ServiceStatus } from 'src/app/api/interfaces/service/service.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  public services: Service[] = null;

  constructor() {
    setTimeout(() => {
      this.getServices()
    }, environment.SKELETON_TIME)
   }

  ngOnInit() {
   
   }

   getServices(){
     return this.services = [
      {
        name: "Carro lijero",
        status: ServiceStatus.NO_DISPONIBLE,
        address: "Calle 15 #521 % Esta",
        schedule: '10:00-18:30',
        rate: 4.5,
        photo: "../../../assets/images/carga1.jpg",
        pickupTime: "61m"
      },
      {
        name: "Taxi",
        status: ServiceStatus.DISPONIBLE,
        address: "Calle 15 #521 % Esta",
        schedule: '10:00-18:30',
        rate: 4.5,
        photo: "../../../assets/images/carga2.jpg",
        pickupTime: "61m"
      },
      {
        name: "Traslado de equipaje",
        status: ServiceStatus.DISPONIBLE,
        address: "Calle 15 #521 % Esta",
        schedule: '8:00-16:30',
        rate: 4.1,
        photo: "../../../assets/images/carga3.jpg",
        pickupTime: "61m"
      },
      {
        name: "Carga pesada",
        status: ServiceStatus.NO_DISPONIBLE,
        address: "Calle 15 #521 % Esta",
        schedule: '7:00-14:30',
        rate: 4.8,
        photo: "../../../assets/images/carga4.jpg",
        pickupTime: "40m"
      },
    ]
   }

  yeah(){
    console.log(this.services);
  }

}
