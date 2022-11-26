import { LANGUAGE } from 'src/app/services/language/language.service';
import { NavController, PopoverController } from '@ionic/angular';
import { UpdateProfileInput } from './../../api/models/update-profile.input';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CommonService } from './../../services/common/common.service';
import { UserService } from './../../api/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Gender } from 'src/app/data/gender.enum';

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
  genders = Gender;

  //Calendar props
  max = this.currentYear - 15;
  min = this.currentYear - 122;
  doneText;
  cancelText;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private translate: TranslateService,
    private navCtrl: NavController,
    public popoverController: PopoverController
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
    this.profileForm = this.formBuilder.group({
      firstName: [this.user?.profile?.firstName, [Validators.required]],
      lastName: [this.user?.profile?.lastName, [Validators.required]],
      email: [this.user?.email, [Validators.required, Validators.email]],
      gender: [this.user?.profile?.gender, [Validators.required]],
      phone: [this.user?.profile?.phone, [Validators.required]],
      dateOfBirth: [this.user?.profile?.dateOfBirth, [Validators.required]]
    });
    setTimeout(() => {
      this.show = true;
    }, environment.skeletonTime);
    this.dateValue = this.dateOfBirth.value ? this.formatDate(this.dateOfBirth.value) : this.translate.instant('edit_profile.birthdate');
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
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
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

  setDate(value: string) {
    this.dateOfBirth.setValue(value);
    this.dateValue = this.formatDate(value);
  }

  setLocale() {
    switch (LANGUAGE()) {
      case 'es':
        return 'es-Es';
      case 'en':
        return 'en-En';
    }
  }

  formatDate(value: string) {
    switch (LANGUAGE()) {
      case 'es':
        return format(parseISO(value), 'dd MMM yyyy');
      case 'en':
        return format(parseISO(value), 'yyyy MMM dd');
    }
  }
}
