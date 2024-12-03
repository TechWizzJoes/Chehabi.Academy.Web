import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '@App/Common/Services/Language.Service';
import { TranslateModule } from '@ngx-translate/core';

export class Language {
  Name!: string;
  Key!: string;
}

@Component({
  selector: 'app-language-popup',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbPopoverModule, TranslateModule],
  templateUrl: './LanguagePopUp.html',
  styleUrl: './LanguagePopUp.scss',
})
export class LanguagePopUpComponent implements OnInit {
  AvailableLanguages: Language[] = [{ Name: 'English', Key: 'en' }, { Name: 'German', Key: 'de' }]
  currentLang: string = '';

  constructor(
    private LanguageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.setCurrentLanguage();
  }

  useLanguage(language: string): void {
    this.LanguageService.useLanguage(language);
    setTimeout(() => {
      this.setCurrentLanguage();
    }, 0);
  }

  setCurrentLanguage(): void {
    this.currentLang = this.LanguageService.getCurrentLanguage();
  }
}
