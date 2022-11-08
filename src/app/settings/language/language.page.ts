import { NavController } from '@ionic/angular';
import { LangTypes } from './../../services/language/language.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { LANGUAGE, setLanguage } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {

  public selectedLanguage = LANGUAGE();
  languageForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private navController: NavController) { }

  get lang() {
    return this.languageForm.get('lang');
  }

  async ngOnInit() {
    this.languageForm = this.formBuilder.group({
      lang: [this.selectedLanguage, [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.languageForm.invalid) {return;}

    setLanguage(this.lang.value === 'en' ? LangTypes.English : LangTypes.Spanish);
    this.navController.back();
  }
}
