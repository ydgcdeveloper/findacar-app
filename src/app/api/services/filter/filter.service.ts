import { Injectable } from '@angular/core';
import { Filter, SortByTypes } from '../../interfaces/filter/filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filter: Filter = {
    sortBy: SortByTypes.RATING,
    onlyAvailable: true,
    priceRange: {
      lower: 100,
      upper: 400
    },
    categories: [1, 3]
  };

  constructor() { }

  getFilter() {
    return this.filter;
  }

  saveFilter(filter: Filter): void {
    this.filter = filter;
  }
}
