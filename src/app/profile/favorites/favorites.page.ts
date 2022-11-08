import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Service } from '../../api/interfaces/service.interface';
import { ServiceService } from '../../api/services/service/service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  public services: Service[] = null;

  constructor(private service: ServiceService) {}

  ngOnInit() {
    setTimeout(() => {
      this.getServices();
    }, environment.skeletonTime);
  }

  getServices() {
    this.services = this.service.getAllServices();
  }

}
