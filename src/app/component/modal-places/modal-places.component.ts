import { Component, Input, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-modal-places',
  templateUrl: './modal-places.component.html',
  styleUrls: ['./modal-places.component.scss'],
})
export class ModalPlacesComponent implements OnInit {
  @Input() places: any[];
  @Input() map: Leaflet.Map;
  @Input() modalPlaces;

  constructor() { }

  ngOnInit() { }

  goToPlace(place) {
    this.map.flyTo([place.latitude, place.longitude], 13);
    if (this.modalPlaces) {
      this.modalPlaces.dismiss();
    }
  }

}
