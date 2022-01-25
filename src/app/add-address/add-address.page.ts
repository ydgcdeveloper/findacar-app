import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  public id: number;
  public name: string = '';
  public details: string = '';
  public address: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.id);
  }

  navigate() {
    if (this.id) {
      let locationData = {
        name: 'Cuba, Holguin, Holguin',
        latitude: 23.5634826412,
        longitude: 78.2316094,
      }
      let navigationExtras: NavigationExtras = {
        state: {
          locationData
        }
      };
      this.router.navigate(['map'], navigationExtras)
    } else {
      this.router.navigate(['map'])
    }
  }

}
