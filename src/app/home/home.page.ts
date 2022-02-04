import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/api/services/filter/filter.service';
import { environment } from 'src/environments/environment';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { Category } from '../api/interfaces/category/category.interface';
import { Service } from '../api/interfaces/service/service.interface';
import { ServiceService } from '../api/services/service/service.service';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {

  categories: Category[];
  public services: Service[] = null;

  constructor(private router: Router, private _service: FilterService, private _serviceService: ServiceService) {}

  ngOnInit() {
    setTimeout(() => {
     this.getCategories()
     this.getServices()
     }, environment.SKELETON_TIME)
  }

  getCategories(){
    this.categories = this._service.getCategories();
  }

  getServices() {
    this.services = this._serviceService.getAllServices();
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
