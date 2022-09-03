import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

}

export const LANGUAGE = (): string => {
  return localStorage.getItem(environment.lang_variable_name || 'app_language') || environment.default_language;
}

export const setLanguage = (langName: LangTypes): void => {
  localStorage.setItem(environment.lang_variable_name || 'app_language', langName)
}

export enum LangTypes {
  Spanish = 'es',
  English = 'en'
}
