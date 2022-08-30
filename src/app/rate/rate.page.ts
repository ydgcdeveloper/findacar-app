import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RateOption } from '../api/interfaces/rate/rate-option.interface';
import { Service } from '../api/interfaces/service/service.interface';
import { RateService } from '../api/services/rate/rate.service';
import { ServiceService } from '../api/services/service/service.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.page.html',
  styleUrls: ['./rate.page.scss'],
})
export class RatePage implements OnInit {
  service: Service;
  rateOptions: RateOption[];
  id: number;
  rate = 3;

  constructor(private router: Router, private _service: ServiceService, private rate_service: RateService, private activated: ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(this.activated.snapshot.paramMap.get('id'));
    if (this.id) {
      this.setService(this.id);
    }
    this.setRateOptions();

  }

  ionViewDidEnter() {
    document.getElementById('serviceComponent').style.setProperty('background-image', `url(${this.service.photo})`);
    this.setEventToChips();
    console.log('did enter');
  }

  setEventToChips() {
    const chips = document.getElementById('chips').children;
    Array.from(chips).forEach((chip) => {
      chip.addEventListener('click', () => {
        const color = chip.getAttribute('color');
        if (color == 'medium') {
          chip.setAttribute('color', 'dark');
          chip.setAttribute('outline', 'true');
        } else {
          chip.setAttribute('color', 'medium');
          chip.setAttribute('outline', 'false');
        }

      });
    });
  }

  setService(id: number) {
    this.service = this._service.getServiceById(id);
  }

  setRateOptions() {
    this.rateOptions = this.rate_service.getAllRateOptions();
  }

  checkDiference(number1: number) {
    const number2 = Math.ceil(this.rate);
    return Math.abs(number1 - number2) <= 1;
  }

  goToOrders() {
    this.router.navigate(['tabs/order'], { fragment: 'previous' });
  }

  setRate(rate: number) {
    const stars = document.getElementsByClassName('star-rate');
    if (this.rate == rate || this.rate == rate - 0.5) {
      if (stars.item(rate - 1).getAttribute('name') == 'star') {
        stars.item(rate - 1).setAttribute('name', 'star-half');
        rate = rate - 0.5;
      } else {
        stars.item(rate - 1).setAttribute('name', 'star');
      }
    }
    for (let i = 0; i < stars.length; i++) {
      stars.item(i).setAttribute('color', 'light');
      if (i + 1 != Math.ceil(rate)) {
        stars.item(i).setAttribute('name', 'star');
      }
    }
    for (let i = 0; i < Math.ceil(rate); i++) {
      stars.item(i).setAttribute('color', 'warning');
    }
    this.rate = rate;
  }
}
