import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export class VerifyEmailPageForm {

  public constructor(private formBuilder: FormBuilder) {
  }

  public createForm(): FormGroup {
    return this.formBuilder.group({
      code1: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.min(0), Validators.max(9)]],
      code2: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.min(0), Validators.max(9)]],
      code3: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.min(0), Validators.max(9)]],
      code4: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.min(0), Validators.max(9)]]
    });
  }
}
