import { SortByTypes } from './../api/interfaces/filter';
import { Rate, RateOption } from './../api/interfaces/rate.interface';
import { FilterService } from 'src/app/api/services/filter/filter.service';
import { AddressService } from './../api/services/address/address.service';
import { ViewWillEnter } from '@ionic/angular';
import { UserService } from './../api/services/user/user.service';
import { CategoryService } from './../api/services/category/category.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { Category } from '../api/interfaces/category.interface';
import { Service } from '../api/interfaces/service.interface';
import { TransportService } from '../api/services/transport/transport.service';
import { AuthService } from '../api/services/auth/auth.service';
import { getAvailability } from '../util/common';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit, ViewWillEnter {

  categories: Category[];
  public services: Service[] = null;
  filter = null;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private transportService: TransportService,
    private filterService: FilterService,
    private userService: UserService,
    private authService: AuthService,
    private addressService: AddressService
  ) { }

  async ngOnInit() {

  }

  async ionViewWillEnter() {
    this.addressService.getAddressesByUser();
    const userId = parseInt(this.authService.getUserId(), 10);
    await this.userService.getUser(userId);
    console.log('User in home: ', this.userService.user);
    this.getCategories();
    await this.getServices();

    this.filter = this.filterService.getFilter();
    this.executeFilter();
  }

  sortByFilter() {
    switch (this.filter.sortBy) {
      case SortByTypes.CLOSENESS:
        break;
      case SortByTypes.ARRIVAL_TIME:
        break;
      default:
        this.services = this.services.sort((a, b) => b.rating - a.rating);
    }
  }

  executeFilter() {
    if (!this.filter) {
      return;
    }
    this.sortByFilter();

    if (this.filter.onlyAvailable) {
      this.services = this.services.filter((service) => {
        if (getAvailability(service)) {
          return service;
        }
      });
    }
  }

  async getCategories() {
    this.categories = await this.categoryService.getCategories();
  }

  async getServices() {
    this.services = await this.transportService.getTransportServices();
  }

  getUsersV1() {
    this.userService.getUsersV1().then((value) => {
      if (value) {
      }
    });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  yeah() {
    this.router.navigate(['tabs/search']);
  }
}
