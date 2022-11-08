import { NavController } from '@ionic/angular';
import { AuthenticationService } from './../services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private navCtrl: NavController) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth();
  }


  private async checkAuth() {
    const authed = this.authService.isAuthenticated();
    return authed || this.routeToLogin();
  }

  private routeToLogin(): boolean { this.navCtrl.navigateRoot('/login'); return false; }

}
