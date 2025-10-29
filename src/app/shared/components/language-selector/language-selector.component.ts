import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LanguageService } from '../../core/services/language/language.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent implements OnInit {

  isOpen = false;
  private languageService = inject(LanguageService);

  langues = [
    { key: 'fr', name: 'Français', icon: '/flags/fr.svg' },
    { key: 'en', name: 'English', icon: '/flags/en.svg' },
  ];

  selectedLanguage = this.langues[0];

  ngOnInit() {
    const currentLang = this.languageService.getCurrentLanguage();
    const lang = this.langues.find(l => l.key === currentLang);
    if (lang) {
      this.selectedLanguage = lang;
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  handleLanguageChange(lang: any) {
    this.selectedLanguage = lang;
    this.languageService.setLanguage(lang.key);
    this.isOpen = false;
  }
}
