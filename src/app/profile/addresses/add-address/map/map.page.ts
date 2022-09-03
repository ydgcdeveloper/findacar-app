import { ModalPlacesComponent } from './../../../../component/modal-places/modal-places.component';
import { Address } from './../../../../interfaces/address/address.interface';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { IonRouterOutlet, ModalController, NavController, ToastController } from '@ionic/angular';
import * as Leaflet from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  L: Leaflet;
  public place = '';
  public search = false;
  public map;
  latitude;
  longitude;
  markerLat: number;
  markerLon: number;
  markerName: string;
  accessToken = 'pk.eyJ1IjoieWRnY2RldmVsb3BlciIsImEiOiJja3lkZTV3eTMwMWFiMnhwaDg4c29uY2dpIn0.yp2HiVFQOpP5sREO3rYgPg';
  public showSaveButton = false;
  private marker = null;
  public places: any[] = [];
  public placesData: any[] = [];
  public showModalplaces = false;
  public modalPlaces;
  address: Address;
  markerIcon = Leaflet.icon({
    iconUrl: 'marker-icon.png',
    shadowUrl: '../../assets/icon/marker-shadow.png',
    iconAnchor: [12, 41],
  });

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
    private outlet: IonRouterOutlet) {
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

    console.log('place marker');
    this.marker = Leaflet.marker([this.address.locationData.latitude, this.address.locationData.longitude], {
      icon: this.markerIcon,
    }).addTo(this.map).bindPopup(this.address.name).openPopup();
  }

  ionViewDidEnter() {

    const address = localStorage.getItem('address');
    if (address) {
      this.address = JSON.parse(address);
    }

    console.log('did enter');
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
          }).addTo(this.map).bindPopup('Estás aquí ahora').openPopup();

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

          this.presentToast('Localización encontrada');
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
        switch (place) {
          case 'Holguin':
            this.place = 'Cuba, Holguín, Holguín';
            break;
          case 'Havana':
            this.place = 'Cuba, La Habana';
            break;
          case 'Matanzas':
            this.place = 'Cuba, Matanzas, Cárdenas';
            break;
          case 'Bayamo':
            this.place = 'Cuba, Granma, Bayamo';
            break;
          case 'Las Tunas':
            this.place = 'Cuba, Las Tunas, Las Tunas';
            break;
          default:
            this.place = 'Cuba, Holguín, Holguín';
            break;
        }

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

        for (let i = 0; i < result.length; i++) {
          this.places.push(result[i]);
        }

        this.presentToast('length: ' + result.length);
      }).then(() => {
        if (this.places.length) {
          this.placesData = [];
          const places = this.places;
          for (let i = 0; i < places.length; i++) {
            this.nativeGeocoder.reverseGeocode(places[i].latitude, places[i].longitude, this.options)
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
                  latitude: places[i].latitude,
                  longitude: places[i].longitude,
                  name: phrase
                };
                this.placesData.push(data);
              })
              .catch((error: any) => {
                this.presentToast('error looking from there: ' + error);
              });
          }

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
    Leaflet.tileLayer(`https://api.mapbox.com/styles/v1/ydgcdeveloper/ckydhd4y52fln14nxce24lhao/tiles/{z}/{x}/{y}?access_token=${this.accessToken}`, {
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
