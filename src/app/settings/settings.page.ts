import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE } from '../services/language/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  selectedLanguage(): string {
    switch (LANGUAGE()) {
      case 'es':
        return this.translate.instant('settings.lang_spanish');
      case 'en':
        return this.translate.instant('settings.lang_english');
    }
    return this.translate.instant('settings.lang_spanish');
  }

}
