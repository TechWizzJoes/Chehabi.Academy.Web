import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

@Directive({
    selector: '[ComingSoonBadge]'
})
export class ComingSoonDirective implements OnInit {
    @Input() ComingSoonBadge?: boolean = true;

    constructor(private el: ElementRef,
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        if (this.ComingSoonBadge) {
            this.setValues();
            this.translate.onLangChange.subscribe(() => {
                this.setValues();
            });
        }
    }

    setValues() {
        forkJoin([
            this.translate.get('coming'),
            this.translate.get('soon')
        ]).subscribe(([comingTranslation, soonTranslation]) => {
            const nativeElement = this.el.nativeElement;
            nativeElement.classList.add('coming-soon-badge');
            nativeElement.style.setProperty('--coming-soon-1', `"${comingTranslation}"`);
            nativeElement.style.setProperty('--coming-soon-2', `"${soonTranslation}"`);
        });
    }
}
