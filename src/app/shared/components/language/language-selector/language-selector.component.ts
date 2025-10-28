import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {

  isOpen = false;

  languages = [
    { key: 'fr', name: 'Français', icon:'/flags/fr.svg' },
    { key: 'en', name: 'English',  icon:'/flags/en.svg' },
  ];

  selectedLanguage = this.languages[0];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  handleLanguageChange(lang: any) {
    this.selectedLanguage = lang;
    this.isOpen = false;

  }

}
