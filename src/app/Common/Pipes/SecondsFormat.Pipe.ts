import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'secondsformat' })
export class SecondsFormatPipe implements PipeTransform {
	constructor() {}
	transform(seconds?: string | number): string {
		if (!seconds) return '00:00:00';
		let sec;
		if (typeof seconds === 'string') {
			sec = parseInt(seconds);
		} else {
			sec = seconds;
		}

		var hours = Math.floor(sec / 3600);
		var minutes = Math.floor((sec % 3600) / 60);
		var remainingSeconds = sec % 60;

		var timeString = '';
		if (sec == 0) return '00:00:00';

		if (hours < 10) {
			timeString += '0' + hours;
		} else {
			timeString += hours;
		}

		timeString += ':';

		if (minutes < 10) {
			timeString += '0' + minutes;
		} else {
			timeString += minutes;
		}

		timeString += ':';

		if (remainingSeconds < 10) {
			timeString += '0' + remainingSeconds;
		} else {
			timeString += remainingSeconds;
		}

		return timeString;
	}
}
