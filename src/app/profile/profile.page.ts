import { Component, OnInit } from '@angular/core';

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
    }, 2000)
  }

}
