import { ViewWillEnter } from '@ionic/angular';
import { AuthRepoService } from './../api/repos/auth/auth-repo.service';
import { UserService } from './../api/services/user/user.service';
import { CategoryService } from './../api/services/category/category.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/api/services/filter/filter.service';
import { environment } from 'src/environments/environment';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { Category } from '../api/interfaces/category.interface';
import { Service } from '../api/interfaces/service.interface';
import { ServiceService } from '../api/services/service/service.service';
import { AuthService } from '../api/services/auth/auth.service';

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

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private serviceService: ServiceService,
    private userService: UserService,
    private authService: AuthService
    ) {}

  async ngOnInit() {

  }

  async ionViewWillEnter() {
    const userId = parseInt(this.authService.getUserId(), 10);
    await this.userService.getUser(userId);
    console.log('User in home: ', this.userService.user);
    setTimeout(() => {
     this.getCategories();
     this.getServices();
    //  this.getUsersV1();
     }, environment.skeletonTime);
  }

  getCategories(){
    this.categories = this.categoryService.getCategories();
  }

  getServices() {
    this.services = this.serviceService.getAllServices();
  }

  getUsersV1(){
    this.userService.getUsersV1().then((value) =>{
      if(value){
      }
    });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  yeah(){
    this.router.navigate(['tabs/search']);
  }
}
