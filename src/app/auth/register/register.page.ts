import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      emailUser: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern('')]],
      repeatPassword: [null, [Validators.required, Validators.pattern('')]]
    });
  }

  onSubmit() {
    console.log('onSubmit()');
  }
}
