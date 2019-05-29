import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleSettingsService {

  LANGMAP = {
    'en': 'English',
    'fr': 'French',
    'af': 'Afrikaans',
    'es': 'Spanish',
    'de': 'German'
  };

  constructor() { }

  getLanguage(): string {
    if (localStorage) {
      return localStorage['language'] || 'en';
    }
    else {
      return 'en';
    }
  }

  setLanguage(language: string) {
    if (localStorage) {
      localStorage['language'] = language;
    }
  }
}
