import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
// import { Device } from '@awesome-cordova-plugins/device/ngx';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  locationWatchStarted: boolean;
  locationSubscription: any;
  isAndroid: boolean;

  locationTraces = [];

  constructor(public toastController: ToastController, private geolocation: Geolocation, private router: Router) { }

  ngOnInit() {
    // console.log('Device UUID is: ' + this.device.version);
    // this.isAndroid = this.device.platform === 'Android';
    const coord = this.getCoordinates();
    coord.then(() => {
      this.router.navigateByUrl('/tabs')
    }, () => {
      console.log('dsadsadsad')
    })

    // this.presentToast("Toast:  " +this.device.platform)

    // // Schedule a single notification
    // this.localNotifications.schedule({
    //   id: 1,
    //   text: 'Single ILocalNotification',
    //   sound: this.isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
    //   data: { secret: 'here' }
    // });

    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    // );

    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

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
