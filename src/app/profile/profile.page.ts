import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {
  public show = false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.show = true;
    }, environment.SKELETON_TIME);
  }

}
