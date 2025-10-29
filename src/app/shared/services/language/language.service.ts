import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private defaultLang = 'fr';
   private translate= inject(TranslateService)

  constructor() {
    const lang = localStorage.getItem('lang') || 'fr';
    this.translate.use(lang);

  }

  defaultLanguage(): string {
    return this.defaultLang;
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.defaultLang;
  }

  getAvailableLanguages(): string[] {
    return ['en', 'fr'];
  }
}
