import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from 'src/app/interface/category.interface';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {
  private slides: any;
  public categories: Category[] = [
    {
      name: 'Carga pesada',
      color: 'red',
      description: 'Heavy cargo',
      photo: `../../../assets/images/carga${this.getRandomInt(1,4)}.jpg`,
    },
    {
      name: 'Electrodomesticos',
      color: 'blue',
      description: 'Carga y transporte de electrodomesticos hasta 1T',
      photo: `../../../assets/images/carga${this.getRandomInt(1,4)}.jpg`,
    },
    {
      name: 'Mudanza',
      color: 'blue',
      description: 'Para mudanza en todo el país',
      photo: `../../../assets/images/carga${this.getRandomInt(1,4)}.jpg`,
    },
    {
      name: 'Personal',
      color: 'pink',
      description: 'Recogida y transporte de personal a lugares publicos',
      photo: `../../../assets/images/carga${this.getRandomInt(1,4)}.jpg`,
    },
    {
      name: 'Taxi',
      color: 'yellow',
      description: 'Recogida y transporte de personal a lugares especificos',
      photo: `../../../assets/images/carga${this.getRandomInt(1,4)}.jpg`,
    }
  ];

  ngOnInit() {
    console.log(this.slides)
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }
}
