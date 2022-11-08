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
export class SearchPage implements OnInit {
  @ViewChild('searcher') sInput;

  categories: Category[];

  constructor(private router: Router, private categoryService: CategoryService) {}

  ngOnInit() {
    setTimeout(() => {
     this.getCategories();
     }, environment.skeletonTime);
  }

  getCategories(){
    this.categories = this.categoryService.getCategories();
  }

  ionViewDidEnter() {
    this.sInput.setFocus();
  }

}
