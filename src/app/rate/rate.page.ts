import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../api/interfaces/service/service.interface';
import { ServiceService } from '../api/services/service/service.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.page.html',
  styleUrls: ['./rate.page.scss'],
})
export class RatePage implements OnInit {
  service: Service;
  id: number;

  constructor(private router: Router, private _service: ServiceService, private activated: ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(this.activated.snapshot.paramMap.get('id'))
    if(this.id){
      this.setService(this.id);
    }
  }

  setService(id: number) {
    this.service = this._service.getServiceById(id);
  }

  goToOrders() {
    this.router.navigate(['tabs/order'], { fragment: 'previous' })
  }

}
