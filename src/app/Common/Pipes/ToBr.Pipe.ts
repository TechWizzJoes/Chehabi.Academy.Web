import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toBr' })
export class ToBrPipe implements PipeTransform {
	transform(text: string | null | undefined): string {
		if (text) {
			return text.replace(/\n/g, ' <br /> ');
		} else {
			return '';
		}
	}
}
