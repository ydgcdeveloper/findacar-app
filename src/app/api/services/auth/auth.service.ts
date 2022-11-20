import { SignupInput } from './../../models/signup.input';
import { User } from './../../interfaces/user.interface';
import { Token } from './../../interfaces/token.interface';
import { LoginResponse } from './../../interfaces/responses/login-response';
import { Router } from '@angular/router';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject, from, of } from 'rxjs';
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

  signUp(signupInput: SignupInput): Promise<boolean> {
    return new Promise((resolve, reject) => {
      from(this.authRepo.signUp(signupInput)).subscribe(
        {
          next: (signupData) => {
            resolve(signupData.data.createAccount);
          },
          error: (error) => {
            reject(error);
          }
        }
      );
    });
  }

  login(loginInput: LoginInput): Promise<boolean> {
    return new Promise((resolve, reject) => {
      from(this.authRepo.login(loginInput)).subscribe(
        {
          next: (loginData) => {
            AuthService.save({ access_token: loginData.data.login.accessToken as string });
            this.authState.next(true);
            resolve(true);
          },
          error: (error) => {
            reject(error);
          }
        }
      );
    });
  }

  verifyEmailByPin(id: string, code: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      from(this.authRepo.verifyEmailByPin(id, code)).subscribe({
        next: () => {
          resolve(true);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  async logout() {
    localStorage.removeItem(STORAGE_ACCESS_TOKEN_KEY);
    await this.router.navigate(['login']);
    this.authState.next(false);
  }

  isAuthenticated() {
    return this.authState.value;
  }

  private static save(token: Token) {
    localStorage.setItem(STORAGE_ACCESS_TOKEN_KEY, token.access_token);
  }

}
