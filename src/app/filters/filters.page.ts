import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {

  show: boolean = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.show = true;
    }, environment.SKELETON_TIME)
  }

  public customFormatter(value: number) {
    return `$${value}`
  }
}
