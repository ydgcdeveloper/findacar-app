import { UserService } from './../api/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../api/services/auth/auth.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit, ViewWillEnter {
  public show = false;
  user;

  constructor(
    private authService: AuthService,
    private usersService: UserService,
  ) { }

  async ngOnInit() {
    setTimeout(() => {
      this.show = true;
    }, environment.skeletonTime);
  }

  async ionViewWillEnter() {
    const userId = parseInt(this.authService.getUserId(), 10);
    await this.usersService.getUser(userId).then(() => {
      this.user = this.usersService.user;
    });
    console.log('ProfilePage ionViewWillEnter');
  }

  logOut() {
    this.authService.logout();
  }
}
