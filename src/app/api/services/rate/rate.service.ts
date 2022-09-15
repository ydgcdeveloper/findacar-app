import { Rate } from './../../interfaces/rate/rate.interface';
import { Injectable } from '@angular/core';
import { RateOption, RateOptionQuality } from '../../interfaces/rate/rate.interface';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  rateOptions: RateOption[] = [
    {
      id: 1,
      description: 'Vehículo Cómodo',
      value: 4,
      quality: RateOptionQuality.MUY_BIEN
    },
    {
      id: 2,
      description: 'Conductor Agradable',
      value: 4,
      quality: RateOptionQuality.MUY_BIEN
    },
    {
      id: 3,
      description: 'Avería en el viaje',
      value: 2,
      quality: RateOptionQuality.REGULAR
    },
    {
      id: 4,
      description: 'Vehículo Seguro',
      value: 4,
      quality: RateOptionQuality.MUY_BIEN
    },
    {
      id: 5,
      description: 'Puntualidad',
      value: 4,
      quality: RateOptionQuality.MUY_BIEN
    },
    {
      id: 6,
      description: 'Recogida tardía',
      value: 3,
      quality: RateOptionQuality.REGULAR
    },
  ];

  rates: Rate[] = [
    {
      id: 1,
      serviceId: 2,
      rate: 3,
      rateOptions: [1, 4],
    },
    {
      id: 2,
      serviceId: 3,
      rate: 4.5,
      rateOptions: [3],
    },
    {
      id: 3,
      serviceId: 2,
      rate: 3,
      rateOptions: [6],
    },
    {
      id: 4,
      serviceId: 1,
      rate: 4,
      rateOptions: [2, 5],
    },
  ]

  constructor() { }

  getAllRateOptions() {
    return this.rateOptions;
  }

  getAllRates() {
    return this.rates;
  }
}
