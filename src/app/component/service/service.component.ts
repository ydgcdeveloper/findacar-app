import { Component, Input, OnInit } from '@angular/core';
import { Service, ServiceStatus } from 'src/app/api/interfaces/service.interface';
import { ServiceService } from 'src/app/api/services/service/service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  @Input() service: Service = null;

  constructor(private _service: ServiceService) {}

  ngOnInit() {
    // setTimeout(() => {
    //   this.getServices()
    // }, environment.skeleton_time)
  }

  // getServices() {
  //   return this.services = this._service.getAllServices();
  // }

  yeah() {
    console.log(this.service);
  }

}
