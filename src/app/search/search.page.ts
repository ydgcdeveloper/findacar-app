import { ViewWillEnter } from '@ionic/angular';
import { CategoryService } from './../api/services/category/category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Category } from '../api/interfaces/category.interface';
import { FilterService } from '../api/services/filter/filter.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage implements OnInit, ViewWillEnter {
  @ViewChild('searcher') sInput;

  categories: Category[];

  constructor(private router: Router, private categoryService: CategoryService) {}

  ngOnInit() {
    setTimeout(() => {
     this.getCategories();
     }, environment.skeletonTime);
  }

  async getCategories(){
    this.categories = await this.categoryService.getCategories();
  }

  async ionViewWillEnter() {
    console.log('SearchPage ionViewWillEnter');
  }

  async ionViewDidEnter() {
    console.log('SearchPage');
    this.sInput.setFocus();
  }

}
