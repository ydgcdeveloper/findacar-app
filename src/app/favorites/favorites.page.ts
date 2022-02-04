import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Service } from '../api/interfaces/service/service.interface';
import { ServiceService } from '../api/services/service/service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  public services: Service[] = null;

  constructor(private _service: ServiceService) {}

  ngOnInit() {
    setTimeout(() => {
      this.getServices()
    }, environment.SKELETON_TIME)
  }

  getServices() {
    this.services = this._service.getAllServices();
  }

}
