import { Router } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import { LoginInput } from './../../api/models/login.input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/api/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailUser: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern('')]]
    });
  }

  get emailUser() {
    return this.loginForm.get('emailUser')
  }

  get password() {
    return this.loginForm.get('password')
  }

  async onSubmit() {
    if (this.loginForm.valid) {

      const loginData: LoginInput = {
        password: this.password.value,
        username: this.emailUser.value,
      }

      try {
        await this.authService.login(loginData)
        this.router.navigate(['tabs/home'])
      } catch (error) {
        console.log("Error -->> ",error);
        this.commonService.showErrorMsg(error)
      }
    }
    console.log('onSubmit()');
  }
}
