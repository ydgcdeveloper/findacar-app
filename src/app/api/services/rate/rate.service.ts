import { Injectable } from '@angular/core';
import { RateOption, RateOptionQuality } from '../../interfaces/rate/rate-option.interface';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  rateOptions: RateOption [] = [
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
      id: 4 ,
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
  ]

  constructor() { }

  getAllRateOptions(){
    return this.rateOptions;
  }
}
