import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Category } from '../api/interfaces/category/category.interface';
import { FilterService } from '../api/services/filter/filter.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage implements OnInit {
  @ViewChild('searcher') sInput;

  categories: Category[];

  constructor(private router: Router, private _service: FilterService) {}

  ngOnInit() {
    setTimeout(() => {
     this.getCategories();
     }, environment.SKELETON_TIME);
  }

  getCategories(){
    this.categories = this._service.getCategories();
  }

  ionViewDidEnter() {
    this.sInput.setFocus();
  }

}
