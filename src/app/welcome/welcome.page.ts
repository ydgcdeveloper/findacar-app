import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  locationWatchStarted: boolean;
  locationSubscription: any;

  locationTraces = [];

  constructor(private geolocation: Geolocation, private router: Router) { }

  ngOnInit() {
    const coord = this.getCoordinates();
    coord.then(() =>{
     this.router.navigateByUrl('/tabs')
    } , () => {      
      console.log('dsadsadsad')
    })

    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    // );
    
    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

  }

  async getCoordinates() {
    const coord = await this.geolocation.getCurrentPosition().then((resp) => {

      this.locationTraces.push({
        latitude: resp.coords.latitude,
        longitude: resp.coords.latitude,
        accuracy: resp.coords.accuracy,
        timestamp: resp.timestamp
      });

    }).catch((error) => {
    });


    this.locationSubscription = this.geolocation.watchPosition();
    this.locationSubscription.subscribe((resp) => {
      
      this.locationWatchStarted = true;
      this.locationTraces.push({
        latitude: resp.coords.latitude,
        longitude: resp.coords.latitude,
        accuracy: resp.coords.accuracy,
        timestamp: resp.timestamp
      });

    });
    console.log(this.locationTraces)
    return coord;
  }

}
