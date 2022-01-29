import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilterService } from 'src/app/api/services/filter/filter.service';
import { Category } from 'src/app/interface/category.interface';
import { environment } from 'src/environments/environment';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {
  categories: Category[];

constructor(private _service: FilterService){}

  ngOnInit() {
    setTimeout(() => {
      this.getCategories();
     }, environment.SKELETON_TIME)
  }

  getCategories(){
    this.categories = this._service.getCategories();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}
