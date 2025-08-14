import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    public textDirection!: string;
    public LanguageChangedSub = new Subject<string>();

    constructor(
        private RendererFactory: RendererFactory2,
        private TranslateService: TranslateService
    ) {
        this.SetOnLanguageChange();
    }

    SetLanguageOnAppInit() {
        this.TranslateService.setDefaultLang('en');

        let browserLang = this.TranslateService.getBrowserLang();
        let localStorageLang = localStorage.getItem('lang');

        // console.log(`browser's language: ${browserLang}`);
        if (!localStorageLang) {
            localStorage.setItem('lang', browserLang ?? 'en');
            this.TranslateService.use(browserLang ?? this.TranslateService.defaultLang);
        } else {
            this.TranslateService.use(localStorageLang ?? this.TranslateService.defaultLang);
        }

        this.SetDirection();
    }

    useLanguage(language: string): void {
        this.TranslateService.use(language);
        localStorage.setItem('lang', language);
        this.SetDirection();
    }

    private SetDirection() {
        const lang = localStorage.getItem('lang');
        if (lang === 'ar') {
            this.textDirection = 'rtl';
        } else {
            this.textDirection = 'ltr';
        }
        const renderer = this.RendererFactory.createRenderer(null, null);
        renderer.setAttribute(document.body, 'dir', this.textDirection);
    }

    getCurrentLanguage(): string {
        let localStorageLang = localStorage.getItem('lang');
        // console.log('service language', this.TranslateService.currentLang);
        // console.log('storage language', localStorageLang);
        return this.TranslateService.currentLang;
    }

    SetOnLanguageChange() {
        this.TranslateService.onLangChange.subscribe(() => {
            this.LanguageChangedSub.next(this.TranslateService.currentLang);
        });
    }
}
