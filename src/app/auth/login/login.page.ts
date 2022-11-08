import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { timeStamp } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailUser: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern('')]]
    })
  }

  login() {
    this.authService.login();
  }

  onSubmit() {
    this.login()
    console.log('onSubmit()')
  }
}
