import { NavController } from '@ionic/angular';
import { AuthenticationService } from './../services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../api/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      this.navCtrl.navigateRoot('tabs/home');
      return false;
    }
    return true;
  }
}
