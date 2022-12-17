import { Component, Input, OnInit } from '@angular/core';
import { Service, ServiceStatus } from 'src/app/api/interfaces/service.interface';
import { TransportService } from 'src/app/api/services/transport/transport.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  @Input() service: Service = null;

  constructor(private transportService: TransportService) {}

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
