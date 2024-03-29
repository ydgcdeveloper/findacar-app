import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from 'src/app/api/interfaces/category/category.interface';
import { FilterService } from 'src/app/api/services/filter/filter.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;

constructor(private _service: FilterService){}

  ngOnInit() {
    setTimeout(() => {
     
     }, environment.SKELETON_TIME)
  }


}
