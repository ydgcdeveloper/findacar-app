import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapPlaceService {

  mapPlaces: any[] = [
    {
      tag: 'Holguin',
      description: 'Cuba, Holguín, Holguín'
    },
    {
      tag: 'Havana',
      description: 'Cuba, La Habana'
    },
    {
      tag: 'Matanzas',
      description: 'Cuba, Matanzas, Cárdenas'
    },
    {
      tag: 'Bayamo',
      description: 'Cuba, Granma, Bayamo'
    },
    {
      tag: 'Las Tunas',
      description: 'Cuba, Las Tunas, Las Tunas'
    },
  ]

  constructor() { }

  getMapPlaces(): any [] {
    return this.mapPlaces;
  }
}
