import { Router } from '@angular/router';
import { ToastController, Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // authState = new BehaviorSubject(false);

  // constructor(
  //   private router: Router,
  //   public toastController: ToastController,
  //   private platform: Platform
  // ) {
  //   this.platform.ready().then(() => {
  //     this.ifLoggedIn();
  //   });
  // }

  // ifLoggedIn() {
  //   if (localStorage.getItem('USER_INFO')) {
  //     this.authState.next(true);
  //   }
  // }

  // login() {
  //   const dummyResponse = {
  //     userId: '007',
  //     userName: 'test'
  //   };
  //   localStorage.setItem('USER_INFO', JSON.stringify(dummyResponse));
  //   this.router.navigate(['tabs/home']);
  //   this.authState.next(true);
  // }

  // logout() {
  //   localStorage.removeItem('USER_INFO');
  //   this.router.navigate(['login']);
  //   this.authState.next(false);
  // }

  // isAuthenticated() {
  //   return this.authState.value;
  // }
}
