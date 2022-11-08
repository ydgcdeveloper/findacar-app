import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

}

export const LANGUAGE = (): string => localStorage.getItem(environment.langVariableName || 'app_language') || environment.defaultLanguage;

export const setLanguage = (langName: LangTypes): void => {
  localStorage.setItem(environment.langVariableName || 'app_language', langName);
};

export enum LangTypes {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Spanish = 'es',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  English = 'en'
}
