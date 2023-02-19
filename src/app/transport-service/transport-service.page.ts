import { Service } from './../api/interfaces/service.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transport-service',
  templateUrl: './transport-service.page.html',
  styleUrls: ['./transport-service.page.scss'],
})
export class TransportServicePage implements OnInit {
  transportService: Service;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.transportService = this.router.getCurrentNavigation().extras.state?.service;
  }

}
