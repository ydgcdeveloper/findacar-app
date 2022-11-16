import { User } from './../../interfaces/user.interface';
import { Token } from './../../interfaces/token.interface';
import { LoginResponse } from './../../interfaces/responses/login-response';
import { Router } from '@angular/router';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { LoginInput } from './../../models/login.input';
import { Injectable } from '@angular/core';
import { AuthRepoService } from '../../repos/auth/auth-repo.service';

export const STORAGE_ACCESS_TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    public toastController: ToastController,
    private platform: Platform,
    private authRepo: AuthRepoService
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    if (localStorage.getItem(STORAGE_ACCESS_TOKEN_KEY)) {
      this.authState.next(true);
    }
  }

  login(loginInput: LoginInput): Promise<boolean> {

    return new Promise((resolve, reject) => {
      this.authRepo.login(loginInput).subscribe(
        loginData => {
          AuthService.save({ access_token: loginData.accessToken as string })
          this.authState.next(true);
          resolve(true);
        },
        error => {
          reject(error)
        }
      )
    })

    // this.authRepo.login(loginInput)
    //   .then((loginData: LoginResponse) => {
    //     if (loginData) {
    //       AuthService.save({ access_token: loginData.accessToken as string })
    //       console.log("Login Data", loginData);
    //       this.router.navigate(['tabs/home'])
    //       this.authState.next(true);
    //       return loginData.user;
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //     return error.message
    //   })
    // return;
  }

  logout() {
    localStorage.removeItem(STORAGE_ACCESS_TOKEN_KEY);
    this.router.navigate(['login']);
    this.authState.next(false);
  }

  isAuthenticated() {
    return this.authState.value;
  }

  private static save(token: Token) {
    localStorage.setItem(STORAGE_ACCESS_TOKEN_KEY, token.access_token);
  }

}
