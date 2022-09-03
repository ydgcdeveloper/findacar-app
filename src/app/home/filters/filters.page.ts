import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../../api/interfaces/category/category.interface';
import { FilterService } from '../../api/services/filter/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {

  categories: Category[];
  show = false;

  constructor(private _service: FilterService) { }

  ngOnInit() {
    setTimeout(() => {
      this.getCategories();
      this.show = true;
    }, environment.skeleton_time);
  }

  getCategories(){
    this.categories = this._service.getCategories();
  }

  public customFormatter(value: number) {
    return `$${value}`;
  }
}
