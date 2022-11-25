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

    get emailUser() {
      return this.loginForm.get('emailUser');
    }

    get password() {
      return this.loginForm.get('password');
    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailUser: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern('')]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {

      const loginData: LoginInput = {
        password: this.password.value,
        email: this.emailUser.value,
      };

      try {
        await this.commonService.showLoader();
        await this.authService.login(loginData).then(async (value) => {
          if(value){
            await this.router.navigate(['tabs/home']);
          }
        });
      } catch (error) {
        this.commonService.showErrorMsg(error);
      } finally {
        await this.commonService.hideLoader();
      }
    }
    console.log('onSubmit()');
  }
}
