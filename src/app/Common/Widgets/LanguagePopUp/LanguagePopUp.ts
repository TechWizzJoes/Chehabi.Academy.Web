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
export class LanguagePopUpComponent {
  AvailableLanguages: Language[] = [{ Name: 'English', Key: 'en' }, { Name: 'German', Key: 'de' }]

  constructor(
    private LanguageService: LanguageService) { }


  useLanguage(language: string): void {
    this.LanguageService.useLanguage(language);
  }
}
