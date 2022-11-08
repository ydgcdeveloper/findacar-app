import { Router } from '@angular/router';
import { SplashScreenPlugin } from './../../node_modules/@capacitor/splash-screen/dist/esm/definitions.d';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform, 
    private _location: Location, 
    private toastController: ToastController,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
    this.initializeApp();
    console.log('App init');
   }

  initializeApp() {
    this.platform.backButton.subscribeWithPriority(15, (processNextHandler) => {
      console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/tabs/home')) {

        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.presentToast('Show Exit Alert!');
        processNextHandler();
      } else {

        // Navigate to back page
        console.log('Navigate to back page');
        this.presentToast('Navigate to back page');
        this._location.back();

      }
    });
  }

  checkAuth(){
    this.platform.ready().then(() => {

      this.authenticationService.authState.subscribe(state => {
        if (state) {
          this.router.navigate(['tabs/home']);
        } else {
          this.router.navigate(['login']);
        }
      });

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
}
