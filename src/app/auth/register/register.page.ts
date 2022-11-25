import { Router } from '@angular/router';
import { CommonService } from './../../services/common/common.service';
import { AuthService } from 'src/app/api/services/auth/auth.service';
import { SignupInput } from './../../api/models/signup.input';
import { Validator } from './../../validator/validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.pattern('')]],
      repeatPassword: [null, [Validators.required, Validators.minLength(8), Validators.pattern('')]]
    },
      {
        validators: [Validator.match('password', 'repeatPassword')]
      });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  async onSubmit() {
    if (this.registerForm.valid) {

      const signupData: SignupInput = {
        email: this.email.value,
        password: this.password.value,
      };

      try {
        await this.commonService.showLoader();
        await this.authService.signUp(signupData).then(async (value) => {
          if (value) {
            console.log('Signup Data', value);
            //@ts-ignore eslint-disable-next-line
            await this.router.navigate(['verify-email'], { state: { userID: value.id } });
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
