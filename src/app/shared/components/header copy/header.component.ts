import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { menu } from '../../app/utils/datautils';
import { LanguageService } from '../../app/Api/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  menus = menu;
  @HostListener('window:scroll', [])

  activeSection = '';
  isDarkMode = false;
  menuOpen = false;

  constructor( private languageService: LanguageService){
  }


    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    }

    window.addEventListener('scroll', ()=>{
      const header = document.getElementById('MainHeader');
      if (window.scrollY > 10) {
        header?.classList.add('bg-white', 'shadow-md', 'dark:bg-slate-800/50', 'bg-[#FFAE00]','bg-opacity-[5%]' ,'backdrop-blur-lg');
      } else {
        header?.classList.remove('bg-white', 'shadow-md', 'dark:bg-slate-800/50', 'bg-[#FFAE00]','bg-opacity-[5%]'  ,'backdrop-blur-lg');
      }
    })


  }

    switchLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }

  get currentLang() {
    return this.languageService.getCurrentLanguage();
  }

  get languages() {
    return this.languageService.getAvailableLanguages();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  checkActiveSection(): void {
    const sections = this.menus.map(icon => icon.id);
    for (const id of sections) {
      const section = document.getElementById(id);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = id;
          break;
        }
      }
    }
  }

  scrollToSection(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    console.log(id);
  }


}
