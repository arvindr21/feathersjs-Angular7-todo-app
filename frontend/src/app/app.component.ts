import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from './services/auth.service';

import { LocaleSettingsService } from './services/locale-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  name = 'Username'

  constructor(
    public authService: AuthService,
    public router: Router,
    public translate: TranslateService,
    public localeSettingsService: LocaleSettingsService
  ) {

    translate.addLangs(['en', 'fr', 'af', 'de', 'es']);

    const lang: string = localeSettingsService.getLanguage(); // defaults to en
    translate.setDefaultLang(lang);
    translate.use(lang);
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr|af|de|es/) ? browserLang : (storedLang ? storedLang : 'en'));
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  changeLang(lang) {
    this.translate.use(lang);
    this.localeSettingsService.setLanguage(lang);
  }

}
