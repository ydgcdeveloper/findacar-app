import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from 'src/app/interface/category.interface';
import { environment } from 'src/environments/environment';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {
  public show = false;
  private slides: any;
  public categories: Category[] = [
    {
      name: 'Carga pesada',
      color: 'red',
      description: '',
      photo: `../../../assets/icon/heavy-96.png`,
    },
    {
      name: 'Equipos pesados',
      color: 'blue',
      description: 'Carga y transporte de electrodomesticos hasta 1T',
      photo: `../../../assets/images/car-motor.png`,
    },
    {
      name: 'Mudanza',
      color: 'green',
      description: 'Para mudanza en todo el país',
      photo: `../../../assets/icon/heavy-green-96.png`,
    },
    {
      name: 'Mototaxi',
      color: 'brown',
      description: 'Recogida y transporte de personal a lugares publicos',
      photo: `../../../assets/icon/motorcycle-green-96.png`,
    },
    {
      name: 'Taxi',
      color: 'yellow',
      description: 'Recogida y transporte de personal a lugares especificos',
      photo: `../../../assets/icon/taxi_96.png`,
    }
  ];

  ngOnInit() {
    setTimeout(() => {
      this.show = true;
     }, environment.SKELETON_TIME)
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}
