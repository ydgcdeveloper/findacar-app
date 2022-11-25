import { MapPlaceService } from './../../../../api/services/map-place/map-place.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalPlacesComponent } from './../../../../component/modal-places/modal-places.component';
import { Address } from './../../../../interfaces/address/address.interface';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import * as Leaflet from 'leaflet';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const MAP_ACCESS_TOKEN = environment.mapAccessToken;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  public place = '';
  public search = false;
  public map;
  public showSaveButton = false;
  public places: any[] = [];
  public placesData: any[] = [];
  public showModalplaces = false;
  public modalPlaces;
  latitude;
  longitude;
  markerLat: number;
  markerLon: number;
  markerName: string;
  accessToken: string = MAP_ACCESS_TOKEN;
  address: Address;
  markerIcon = Leaflet.icon({
    iconUrl: 'marker-icon.png',
    shadowUrl: '../../assets/icon/marker-shadow.png',
    iconAnchor: [12, 41],
  });

  public mapPlaces: any[];
  private marker = null;
  private sample: any[] = [
    {
      latitude: 75.45,
      longitude: 59.2,
      name: 'Holguin, Ahi, Ahi'
    },
    {
      latitude: 15.45,
      longitude: 56.2,
      name: 'Holguin, Ahi, Ahi'
    },
    {
      latitude: 75.45,
      longitude: 16.2,
      name: 'Holguin, Ahi, Ahi'
    },
    {
      latitude: 5.45,
      longitude: 66.2,
      name: 'Holguin, Ahi, Ahi'
    },
  ];

  private options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };



  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public toastController: ToastController,
    public modalController: ModalController,
    private router: Router,
    public navCtrl: NavController,
    private translate: TranslateService,
    private mapPlacesService: MapPlaceService
  ) {
    this.mapPlaces = this.mapPlacesService.getMapPlaces();
  }

  ngOnInit() {

    const address = localStorage.getItem('address');
    if (address) {
      this.address = JSON.parse(address);
    }
    console.log('init');
  }

  placeMarker() {
    if (this.marker != null) {
      this.marker.remove();
    };

    this.marker = Leaflet.marker([this.address.locationData.latitude, this.address.locationData.longitude], {
      icon: this.markerIcon,
    }).addTo(this.map).bindPopup(this.address.name).openPopup();
  }

  ionViewDidEnter() {

    const address = localStorage.getItem('address');
    if (address) {
      this.address = JSON.parse(address);
    }

    if (!this.map) {

      this.leafletMap();

      this.map
        .on('click', (e) => {

          this.search = false;
          if (this.marker != null) {
            this.marker.remove();
          };

          this.marker = Leaflet.marker([e.latlng.lat, e.latlng.lng], {
            icon: this.markerIcon,
          }).addTo(this.map);

          this.nativeGeocoder.reverseGeocode(e.latlng.lat, e.latlng.lng, this.options)
            .then((result: NativeGeocoderResult[]) => {
              const res = result[0];
              let phrase = '';
              if (res.countryName) {
                phrase += res.countryName;
              }
              if (res.administrativeArea) {
                phrase += `, ${res.administrativeArea}`;
              }
              if (res.locality) {
                phrase += `, ${res.locality}`;
              }
              this.place = phrase;
            })
            .catch((error: any) => {
              this.presentToast('error click: ' + error);
              this.showSaveButton = false;
            });

          this.showSaveButton = true;
          this.markerLat = e.latlng.lat;
          this.markerLon = e.latlng.lng;
          this.markerName = this.showSaveButton ? this.place : 'Sin nombre';

          console.log(this.markerLat + '  ' + this.markerLon);

        }).on('locationfound', (e) => {

          const myIcon = Leaflet.icon({
            iconUrl: '../../assets/icon/icons8-location-48.png',
            iconAnchor: [21, 41],
          });

          this.latitude = e.latlng.lat;
          this.longitude = e.latlng.lng;

          Leaflet.marker([this.latitude, this.longitude], {
            icon: myIcon
          }).addTo(this.map).bindPopup(this.translate.instant('map.here_now')).openPopup();

          this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude, this.options)
            .then((result: NativeGeocoderResult[]) => {
              const res = result[0];
              let phrase = '';
              if (res.countryName) {
                phrase += res.countryName;
              }
              if (res.administrativeArea) {
                phrase += `, ${res.administrativeArea}`;
              }
              if (res.locality) {
                phrase += `, ${res.locality}`;
              }
              this.place = phrase;
            })
            .catch((error: any) => {
              this.presentToast('error found: ' + error);
            });

          this.presentToast(this.translate.instant('map.location_found'));
        });
    }
    //Colocar marcador en modo edición
    if (this.address) {
      this.placeMarker();
    }
  }

  // navigate to add-address
  saveEdit() {

    const address = {
      id: this.address.id,
      name: this.address.name,
      details: this.address.details,
      locationData: {
        name: this.markerName,
        latitude: this.markerLat,
        longitude: this.markerLon,
      }
    };

    localStorage.removeItem('address');
    localStorage.setItem('address', JSON.stringify(address));

    this.router.navigate(['add-address']);
  }

  onClear() {
    this.search = true;
    this.dismiss();
    this.places = [];
    this.placesData = [];
    this.place = '';
  }

  goBack() {
    this.router.navigate(['add-address']);
  }

  dismiss() {
    if (this.modalPlaces) {
      this.modalPlaces.dismiss();
    }
  }

  async presentModal() {
    this.dismiss();
    this.modalPlaces = await this.modalController.create({
      component: ModalPlacesComponent,
      cssClass: 'modal-places',
      keyboardClose: false,
      componentProps: {
        places: this.placesData,
        map: this.map,
        modalPlaces: this.modalPlaces,
      }
    });
    await this.modalPlaces.present();
  }

  segmentChanged(e) {

    const place = e.detail.value;

    this.nativeGeocoder.forwardGeocode(place, this.options)
      .then((result: NativeGeocoderResult[]) => {

        this.map.flyTo([result[0].latitude, result[0].longitude], 13);
        /** CHECK IF THIS IS WORKING PROPERLY */
        this.place = place.description;
      })
      .catch((error: any) => {
        this.presentToast(`Place Error with '${place}': ` + error);
        this.search = true;
      });
    this.search = false;
  }

  findPlace(place: string) {

    if (place.length < 3 || !this.search) {
      this.dismiss();
      this.search = true;
      return;
    }

    this.nativeGeocoder.forwardGeocode(place, this.options)
      .then((result: NativeGeocoderResult[]) => {
        console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude);
        this.places = [];

        // for (let i = 0; i < result.length; i++) {
        //   this.places.push(result[i]);
        // }

        for (const index in result) {
          this.places.push(result[index]);
        }

        this.presentToast('length: ' + result.length);
      }).then(() => {
        if (this.places.length) {
          this.placesData = [];
          const places = this.places;
          for (const placeHere of places) {
            this.nativeGeocoder.reverseGeocode(placeHere.latitude, placeHere.longitude, this.options)
              .then((result: NativeGeocoderResult[]) => {
                const res = result[0];
                let phrase = '';
                if (res.countryName) {
                  phrase += res.countryName;
                }
                if (res.administrativeArea) {
                  phrase += `, ${res.administrativeArea}`;
                }
                if (res.locality) {
                  phrase += `, ${res.locality}`;
                }
                const data = {
                  latitude: placeHere.latitude,
                  longitude: placeHere.longitude,
                  name: phrase
                };
                this.placesData.push(data);
              })
              .catch((error: any) => {
                this.presentToast('error looking from there: ' + error);
              });
          }
          // for (let i = 0; i < places.length; i++) {
          //   this.nativeGeocoder.reverseGeocode(places[i].latitude, places[i].longitude, this.options)
          //     .then((result: NativeGeocoderResult[]) => {
          //       const res = result[0];
          //       let phrase = '';
          //       if (res.countryName) {
          //         phrase += res.countryName;
          //       }
          //       if (res.administrativeArea) {
          //         phrase += `, ${res.administrativeArea}`;
          //       }
          //       if (res.locality) {
          //         phrase += `, ${res.locality}`;
          //       }
          //       const data = {
          //         latitude: places[i].latitude,
          //         longitude: places[i].longitude,
          //         name: phrase
          //       };
          //       this.placesData.push(data);
          //     })
          //     .catch((error: any) => {
          //       this.presentToast('error looking from there: ' + error);
          //     });
          // }

          this.presentModal();
        }
      })
      .catch((error: any) => {
        this.presentToast('Error: ' + error + ' ' + place);
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      icon: 'locate-outline',
      color: 'dark'
    });
    toast.present();
  }


  leafletMap() {

    this.map = Leaflet.map('mapId');
    Leaflet.tileLayer(
      `https://api.mapbox.com/styles/v1/ydgcdeveloper/ckydhd4y52fln14nxce24lhao/tiles/{z}/{x}/{y}?access_token=${this.accessToken}`,
      {
        attribution: 'Find a Car App',
        minZoom: 2
      }).addTo(this.map);

    this.map.locate({ setView: true, maxZoom: 17 });
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
      console.log(`Latitud: ${this.latitude}`);
      console.log(`Longitud: ${this.longitude}`);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
