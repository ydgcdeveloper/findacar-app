import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/services/auth/auth.service';
import { CommonService, MessageType } from './../../services/common/common.service';
import { VerifyEmailPageForm } from './verify-email.page.form';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  verifyEmailForm: FormGroup;
  dataNavigation: any;
  userID;
  min = 0;
  max = 9;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private authService: AuthService,
    private translate: TranslateService,
    private navController: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    this.verifyEmailForm = new VerifyEmailPageForm(this.formBuilder).createForm();
    this.dataNavigation = this.router.getCurrentNavigation().extras.state;
    console.log('UserID', this.dataNavigation?.userID);
    this.userID = this.dataNavigation?.userID;
  }

  get code1() {
    return this.verifyEmailForm.get('code1').value;
  }

  get code2() {
    return this.verifyEmailForm.get('code2').value;
  }

  get code3() {
    return this.verifyEmailForm.get('code3').value;
  }

  get code4() {
    return this.verifyEmailForm.get('code4').value;
  }

  async onSubmit() {
    if (this.verifyEmailForm.valid) {
      const code = `${this.code1}${this.code2}${this.code3}${this.code4}`;
      try {
        await this.commonService.showLoader();
        await this.authService.verifyEmailByPin(this.userID, code).then(async (value) => {
          if (value) {
            await this.commonService.showMessage(MessageType.SUCCESS, this.translate.instant('verify_email.success_message'));
            await this.navController.navigateRoot('login');
          }
        });
      } catch (e) {
        await this.commonService.showErrorMsg(e);
      } finally {
        await this.commonService.hideLoader();
      }
    }
  }

}
