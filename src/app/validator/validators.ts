import { ValidatorFn, AbstractControl } from '@angular/forms';

export class Validator {
   public static match = (controlName: string, checkControlName: string): ValidatorFn | null => (controls: AbstractControl) => {
            const control = controls.get(controlName);
            const checkControl = controls.get(checkControlName);
            if (checkControl.errors && !checkControl.errors.matching) {
                return null;
            }
            if (control.value !== checkControl.value) {
                controls.get(checkControlName).setErrors({ matching: true });
                return { matching: false };
            } else {
                return null;
            }
        };

}
