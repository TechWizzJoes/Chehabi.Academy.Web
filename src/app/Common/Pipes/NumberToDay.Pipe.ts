import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toDay' })
export class NumberToDayPipe implements PipeTransform {
	constructor() {}
	transform(dayNumber: number | null): string {
		if (dayNumber) return `DatePickerOptions.weekdays.${dayNumber - 1}`;
		return '';
	}
}
