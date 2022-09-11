import { Injectable } from '@angular/core';
import { Filter, SortByTypes } from '../../interfaces/filter/filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filter: Filter = {
    sortBy : SortByTypes.RATING,
    onlyAvailable: true,
    priceRange: {
      lower: 1000,
      upper: 6000
    },
    categories: []
  }
  
  constructor() { }

  getFilter(){
    return this.filter;
  }
}
