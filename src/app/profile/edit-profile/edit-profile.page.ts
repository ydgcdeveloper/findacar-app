import { NavController } from '@ionic/angular';
import { UpdateProfileInput } from './../../api/models/update-profile.input';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CommonService } from './../../services/common/common.service';
import { UserService } from './../../api/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  dateValue;
  miVariableHora = '';
  public currentYear = parseInt(new Date().getFullYear().toString(), 10);
  show = false;
  profileForm: FormGroup;
  user;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private translate: TranslateService,
    private navCtrl: NavController,
  ) { }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get gender() {
    return this.profileForm.get('gender');
  }

  get phone() {
    return this.profileForm.get('phone');
  }

  get dateOfBirth() {
    return this.profileForm.get('dateOfBirth');
  }

  async ngOnInit() {
    this.user = this.userService.user;
    this.dateValue = this.translate.instant('edit_profile.birthdate');
    this.profileForm = this.formBuilder.group({
      firstName: [this.user?.profile?.firstName, [Validators.required]],
      lastName: [this.user?.profile?.lastName, [Validators.required]],
      email: [this.user?.email, [Validators.required, Validators.email]],
      gender: ['MALE', [Validators.required]],
      phone: [this.user?.profile?.phone, [Validators.required]],
      dateOfBirth: ['2022-06-06', [Validators.required]]
    });
    setTimeout(() => {
      this.show = true;
    }, environment.skeletonTime);
    console.log(this.dateValue);
  }

  async onSubmit() {
    // if (this.profileForm.valid) {

      const profileInput: UpdateProfileInput = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        phone: this.phone.value,
        gender: this.gender.value,
        dateOfBirth: this.dateOfBirth.value,
      };

      try {
        await this.commonService.showLoader();
        await this.userService.updateUserProfile(profileInput).then(async (value) => {
          if (value) {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate(['tabs/profile']);
            });
          }
        });
      } catch (error) {
        this.commonService.showErrorMsg(error);
      } finally {
        await this.commonService.hideLoader();
      }
    // }
  }

  validateButton() {
    console.log(this.miVariableHora);
  }

  formatDate(value: string) {
    return format(parseISO(value), 'dd MMM yyyy');
  }
}
