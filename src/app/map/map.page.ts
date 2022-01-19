import { Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ToastController } from '@ionic/angular';
import * as Leaflet from 'leaflet';
import { Marker, Icon } from 'leaflet'

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  L: Leaflet;
  public place: string = '';
  map;
  latitude;
  longitude;
  markerLat;
  markerLon;
  accessToken = "pk.eyJ1IjoieWRnY2RldmVsb3BlciIsImEiOiJja3lkZTV3eTMwMWFiMnhwaDg4c29uY2dpIn0.yp2HiVFQOpP5sREO3rYgPg";
  public showSaveButton = false;
  private marker = null;

  private options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public toastController: ToastController) { }


  ngOnInit() {
    //this.loadMap()
  }

  segmentChanged(e) {
    let place = e.detail.value;
    this.nativeGeocoder.forwardGeocode(place, this.options)
      .then((result: NativeGeocoderResult[]) => {
        console.log('Changed place to: ' + place)
        this.map.locate([result[0].latitude, result[0].longitude ], 10);
      })
      .catch((error: any) => { this.presentToast('Place Error: ' + error) });
  }

  findPlace(place) {

    console.log(place)
    this.nativeGeocoder.forwardGeocode(place, this.options)
      .then((result: NativeGeocoderResult[]) => {
        console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude)
        // this.place = 'The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude;
      })
      .catch((error: any) => { this.presentToast('Error: ' + error) });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      icon: "locate-outline",
      color: 'dark'
    });
    toast.present();
  }

  ionViewDidEnter() {
    this.leafletMap();
    var myIcon = Leaflet.icon({
      iconUrl: 'marker-icon.png',
      iconAnchor: [12, 41],
    });

    this.map.on('click', (e) => {
      this.map = this.map;

      if (this.marker != null) {
        this.marker.remove()
      };

      this.marker = Leaflet.marker([e.latlng.lat, e.latlng.lng], {
        icon: myIcon
      }).addTo(this.map);

      this.showSaveButton = true;
      this.markerLat = e.latlng.lat;
      this.markerLon = e.latlng.lng

    }).on('locationfound', (e) => {
      // var radius = e.accuracy;

      var myIcon = Leaflet.icon({
        iconUrl: 'marker-icon.png',
        iconAnchor: [12, 41],
      });

      this.latitude = e.latlng.lat
      this.longitude = e.latlng.lng

      Leaflet.marker([this.latitude, this.longitude], {
        icon: myIcon
      }).addTo(this.map);

      this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude, this.options)
        .then((result: NativeGeocoderResult[]) => {
          console.log(JSON.stringify(result[0]))
          this.place = JSON.stringify(result[0]);
        })
        .catch((error: any) => { this.presentToast('error: ' + error) });
      this.presentToast("Localización encontrada")
        ;
    })
  }

  leafletMap() {

    this.map = Leaflet.map('mapId');
    Leaflet.tileLayer(`https://api.mapbox.com/styles/v1/ydgcdeveloper/ckydhd4y52fln14nxce24lhao/tiles/{z}/{x}/{y}?access_token=${this.accessToken}`, {
      attribution: 'Find a Car App',
      minZoom: 2
    }).addTo(this.map);

    this.map.locate({ setView: true, maxZoom: 15 });
    // Leaflet.marker([28.6, 77]).addTo(this.map).bindPopup('Delhi').openPopup();
    // Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();

    // antPath([[28.644800, 77.216721], [34.1526, 77.5771]],
    //   { color: '#FF0000', weight: 5, opacity: 0.6 })
    //   .addTo(this.map);
  }

  async loadMap() {
    await this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(`Latitud: ${this.latitude}`)
      console.log(`Longitud: ${this.longitude}`)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
