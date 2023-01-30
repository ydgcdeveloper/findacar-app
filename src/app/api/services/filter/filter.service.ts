import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { Filter, SortByTypes } from '../../interfaces/filter';

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

  constructor(
    private userService: UserService
  ) { }

  getFilter() {
    return this.userService.filter;
  }

  saveFilter(filter: Filter): void {
    this.filter = filter;
  }
}
