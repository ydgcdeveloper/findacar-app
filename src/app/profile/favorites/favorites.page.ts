import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Service } from '../../api/interfaces/service.interface';
import { TransportService } from '../../api/services/transport/transport.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  public services: Service[] = null;

  constructor(private transportService: TransportService) {}

  ngOnInit() {
    setTimeout(() => {
      this.getServices();
    }, environment.skeletonTime);
  }

  async getServices() {
    this.services = await this.transportService.getTransportServices();
  }

}
