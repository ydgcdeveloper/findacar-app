import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ID } from '../../api/interfaces/rate.interface';
import { ServiceService } from 'src/app/api/services/service/service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RateOption } from '../../api/interfaces/rate.interface';
import { Service } from '../../api/interfaces/service.interface';
import { RateService } from '../../api/services/rate/rate.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.page.html',
  styleUrls: ['./rate.page.scss'],
})
export class RatePage implements OnInit {

  rateForm: FormGroup;
  service: Service;
  rateOptions: RateOption[];
  id: ID;
  rate = 3;

  constructor(
    private router: Router,
    private rateService: RateService,
    private serviceService: ServiceService,
    private activated: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  get rateI() {
    return this.rateForm.get('rateI');
  }

  get options() {
    return this.rateForm.get('options');
  }

  get note() {
    return this.rateForm.get('note');
  }

  ngOnInit() {
    this.id = parseInt(this.activated.snapshot.paramMap.get('id'), 10);
    if (this.id) {
      this.setService(this.id);
      // this.rate = this.round(parseFloat(this.rateService.getRateByServiceId(this.id).toFixed(1)), 0.5) || 3;
    }
    this.setRateOptions();
    this.setForm();
  }

  ionViewDidEnter() {
    document.getElementById('serviceComponent').style.setProperty('background-image', `url(${this.service.photo})`);
    this.setEventToChips();
    console.log('did enter');
  }

  setForm() {
    this.rateForm = this.formBuilder.group({
      rateI: [[Validators.required]],
      options: [],
      note: ['', [Validators.minLength(2)]]
    });
  }

  round(value, step = 1.0) {
    const inv = 1.0 / step;
    return Math.round(value * inv) / inv;
  }

  setEventToChips() {
    const chips = document.getElementById('chips').children;
    Array.from(chips).forEach((chip) => {
      chip.addEventListener('click', () => {
        const color = chip.getAttribute('color');
        if (color as string === 'medium') {
          chip.setAttribute('color', 'dark');
          chip.setAttribute('outline', 'true');
          chip.setAttribute('data-selected', 'true');
        } else {
          chip.setAttribute('color', 'medium');
          chip.setAttribute('outline', 'false');
          chip.setAttribute('data-selected', 'false');
        }
      });
    });
  }

  setService(id: number) {
    this.service = this.serviceService.getServiceById(id);
  }

  setRateOptions() {
    this.rateOptions = this.rateService.getAllRateOptions();
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
    if (this.rate === rate || this.rate === rate - 0.5) {
      if (stars.item(rate - 1).getAttribute('name') as string === 'star') {
        stars.item(rate - 1).setAttribute('name', 'star-half');
        rate = rate - 0.5;
      } else {
        stars.item(rate - 1).setAttribute('name', 'star');
      }
    }
    for (let i = 0; i < stars.length; i++) {
      stars.item(i).setAttribute('color', 'light');
      if (i + 1 !== Math.ceil(rate)) {
        stars.item(i).setAttribute('name', 'star');
      }
    }
    for (let i = 0; i < Math.ceil(rate); i++) {
      stars.item(i).setAttribute('color', 'warning');
    }
    this.rate = rate;
  }

  onSubmit() {
    if (this.rateForm.invalid) {
      return;
    }

    try {
      const rate = this.rateI.value;
      const note = this.note.value;
      const chips = document.getElementById('chips').children;
      const options = Array.from(chips).filter(chip => chip.getAttribute('data-selected') as string === 'true')
      .map(value => value.getAttribute('data-rateId'));
    } catch (error) {

    }
  }
}
