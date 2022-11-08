import { Component, OnInit,ViewChild } from '@angular/core';
import { format, parseISO } from 'date-fns';
import {NgForm} from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  dateValue = 'Fecha de Nacimiento';
  miVariableHora = '';
  public currentYear = parseInt(new Date().getFullYear().toString(), 10);
  show = false;

  constructor() { }

  ngOnInit() {
    console.log(this.currentYear.toString());
    setTimeout(() => {
      this.show = true;
    }, environment.skeletonTime);
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }

  validateButton(){
    console.log(this.miVariableHora);
  }

  formatDate(value: string) {
    return format(parseISO(value), 'dd MMM yyyy');
  }

}
