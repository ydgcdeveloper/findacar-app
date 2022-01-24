import { Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { IonRouterOutlet, ModalController, ToastController } from '@ionic/angular';
import * as Leaflet from 'leaflet';
import { ModalPlacesComponent } from '../component/modal-places/modal-places.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  L: Leaflet;
  public place: string = '';
  public search: boolean = false;
  public map;
  latitude;
  longitude;
  markerLat;
  markerLon;
  accessToken = "pk.eyJ1IjoieWRnY2RldmVsb3BlciIsImEiOiJja3lkZTV3eTMwMWFiMnhwaDg4c29uY2dpIn0.yp2HiVFQOpP5sREO3rYgPg";
  public showSaveButton = false;
  private marker = null;
  public places: any[] = [];
  public placesData: any[] = [];
  public showModalplaces = false;
  public modalPlaces;

  private options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public toastController: ToastController,
    public modalController: ModalController,
    private router: Router) {
  }

  ngOnInit() {
    //this.loadMap()
  }

  onClear(e) {
    this.search = true;
    if (this.modalPlaces) {
      this.modalPlaces.dismiss();
      this.places = [];
      this.placesData = [];
      this.place = '';
    }
  }

  goBack() {
    this.router.navigate(['add-address'])
  }

  dismiss() {
    if (this.modalPlaces) {
      this.modalPlaces.dismiss();
    }
  }

  async presentModal() {
    if (this.modalPlaces) {
      this.modalPlaces.dismiss();
    }
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

    let place = e.detail.value;

    this.nativeGeocoder.forwardGeocode(place, this.options)
      .then((result: NativeGeocoderResult[]) => {

        this.map.flyTo([result[0].latitude, result[0].longitude], 13);
        switch (place) {
          case 'Holguin':
            this.place = 'Cuba, Holguín, Holguín'
            break;
          case 'Havana':
            this.place = 'Cuba, La Habana'
            break;
          case 'Matanzas':
            this.place = 'Cuba, Matanzas, Cárdenas'
            break;
          case 'Bayamo':
            this.place = 'Cuba, Granma, Bayamo'
            break;
          case 'Las Tunas':
            this.place = 'Cuba, Las Tunas, Las Tunas'
            break;
          default:
            this.place = 'Cuba, Holguín, Holguín'
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

    if (!place.length || !this.search) {
      this.search = true;
      return;
    }

    this.nativeGeocoder.forwardGeocode(place, this.options)
      .then((result: NativeGeocoderResult[]) => {
        console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude)
        this.places = [];

        for (let i = 0; i < result.length; i++) {
          this.places.push(result[i]);
        }

        this.presentToast('length: ' + result.length)
      }).then(() => {
        if (this.places.length) {
          this.placesData = [];
          let places = this.places
          for (let i = 0; i < places.length; i++) {
            this.nativeGeocoder.reverseGeocode(places[i].latitude, places[i].longitude, this.options)
              .then((result: NativeGeocoderResult[]) => {
                let res = result[0];
                var phrase = '';
                if (res.countryName) {
                  phrase += res.countryName;
                }
                if (res.administrativeArea) {
                  phrase += `, ${res.administrativeArea}`;
                }
                if (res.locality) {
                  phrase += `, ${res.locality}`;
                }
                let data = {
                  latitude: places[i].latitude,
                  longitude: places[i].longitude,
                  name: phrase
                }
                this.placesData.push(data);
              })
              .catch((error: any) => {
                this.presentToast('error looking from there: ' + error)
              });
          }

          this.presentModal();
        }
      })
      .catch((error: any) => {
        this.presentToast('Error: ' + error + ' ' + place)
      });
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
      shadowUrl: '../../assets/icon/marker-shadow.png',
      iconAnchor: [12, 41],
    });

    this.map.on('click', (e) => {

      this.search = false;
      if (this.marker != null) {
        this.marker.remove()
      };

      this.marker = Leaflet.marker([e.latlng.lat, e.latlng.lng], {
        icon: myIcon
      }).addTo(this.map);

      this.nativeGeocoder.reverseGeocode(e.latlng.lat, e.latlng.lng, this.options)
        .then((result: NativeGeocoderResult[]) => {
          console.log(JSON.stringify(result[0]))
          let res = result[0];
          var phrase = '';
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
          this.presentToast('error click: ' + error)
          this.showSaveButton = false;
        });

      this.showSaveButton = true;
      this.markerLat = e.latlng.lat;
      this.markerLon = e.latlng.lng

    }).on('locationfound', (e) => {
      // var radius = e.accuracy;

      var myIcon = Leaflet.icon({
        iconUrl: '../../assets/icon/icons8-location-48.png',
        iconAnchor: [21, 41],
      });

      this.latitude = e.latlng.lat
      this.longitude = e.latlng.lng

      Leaflet.marker([this.latitude, this.longitude], {
        icon: myIcon
      }).addTo(this.map).bindPopup('Estás aquí ahora').openPopup();;

      this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude, this.options)
        .then((result: NativeGeocoderResult[]) => {
          console.log(JSON.stringify(result[0]))
          let res = result[0];
          var phrase = '';
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
          this.presentToast('error found: ' + error)
        });

      this.presentToast("Localización encontrada");
    })
  }

  leafletMap() {

    if (this.map) {
      return;
    }
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
      console.log(`Latitud: ${this.latitude}`)
      console.log(`Longitud: ${this.longitude}`)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
