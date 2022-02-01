import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/api/services/filter/filter.service';
import { environment } from 'src/environments/environment';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { Category } from '../api/interfaces/category/category.interface';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {

  categories: Category[];

  constructor(private router: Router, private _service: FilterService) {}

  ngOnInit() {
    setTimeout(() => {
     this.getCategories()
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

  yeah(){
    this.router.navigate(['tabs/search'])
  }
}
