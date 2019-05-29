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

  DEFAULT = 'en';
  LS_KEY = 'language';

  // 
  constructor() {
    if (!this._getLanguage())
      this.setLanguage(this.DEFAULT);
  }

  _getLanguage(): string {
    return localStorage['language'];
  }

  getLanguage(): string {
    return this._getLanguage() || this.DEFAULT;
  }

  setLanguage(language: string) {
    if (localStorage) {
      localStorage['language'] = language;
    }
  }
}
