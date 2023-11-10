import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safe'
})
export class SafePipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }
    transform(url: string) {
        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        // console.log(safeUrl);

        return safeUrl
    }

}