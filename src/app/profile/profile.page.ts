import { AuthenticationService } from './../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../api/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {
  public show = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.show = true;
    }, environment.skeletonTime);
  }

  logOut() {
    this.authService.logout();
  }

}
