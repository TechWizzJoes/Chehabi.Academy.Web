export class Constants {
	public static PasswordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[0-9a-zA-Z=!@#$%^&*_+)(-]{8,}$/;
	public static EmailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	public static PhonePattern: RegExp =
		/^(?:(?:\+|00)([1-9]\d{0,2}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/;
	public static NumericPattern: RegExp = /^[0-9]\d*$/;
	public static DateFormat = 'mediumDate';
	public static DateTimeFormat = 'MMM d, y h:mm a';
	public static WeekDateFormat = 'EEEE, MMM d, y';
	public static TimeFormat = 'h:mm a';

	public static MinutesDropDown = [
		{ Id: 0, Name: '15' },
		{ Id: 1, Name: '30' },
		{ Id: 2, Name: '45' },
		{ Id: 3, Name: '60' },
		{ Id: 4, Name: '75' },
		{ Id: 5, Name: '90' },
		{ Id: 6, Name: '105' },
		{ Id: 7, Name: '120' },
		{ Id: 8, Name: '135' },
		{ Id: 9, Name: '150' },
		{ Id: 10, Name: '165' },
		{ Id: 11, Name: '180' },
	];

	public static Genders = [
		{ Id: 'M', Name: 'Male' },
		{ Id: 'F', Name: 'Female' }
	];

	public static Weekdays = [
		{ Id: 0, Name: 'Sunday' },
		{ Id: 1, Name: 'Monday' },
		{ Id: 2, Name: 'Tuesday' },
		{ Id: 3, Name: 'Wednesday' },
		{ Id: 4, Name: 'Thursday' },
		{ Id: 5, Name: 'Friday' },
		{ Id: 6, Name: 'Saturday' },
	];

	public static Months = [
		{ Id: 0, Name: 'January' },
		{ Id: 1, Name: 'February' },
		{ Id: 2, Name: 'March' },
		{ Id: 3, Name: 'April' },
		{ Id: 4, Name: 'May' },
		{ Id: 5, Name: 'June' },
		{ Id: 6, Name: 'July' },
		{ Id: 7, Name: 'August' },
		{ Id: 8, Name: 'September' },
		{ Id: 9, Name: 'October' },
		{ Id: 10, Name: 'November' },
		{ Id: 11, Name: 'December' }
	];

	public static Years = function () {
		let years = [];
		let year = new Date().getFullYear();
		for (let i = year; i >= year - 100; i--) {
			years.push({ Id: i, Name: i });
		}
		return years;
	};

	public static Days = function () {
		let days = [];
		for (let i = 1; i <= 31; i++) {
			days.push({ Id: i, Name: i });
		}
		return days;
	};

	public static GetInitialName(firstName: string, lastName: string) {
		let initNames = '';
		if (firstName) {
			initNames = firstName.charAt(0).toUpperCase();
			lastName
				? (initNames = initNames + lastName.charAt(0).toUpperCase())
				: (initNames = initNames + firstName.charAt(1).toLowerCase());
		}
		return initNames;
	}

	public static GetYear() {
		return new Date().getFullYear();
	}

	public static GetTodayDate(): string {
		return this.convertDateToYYYYMMDD(new Date());
	}

	public static convertDateToYYYYMMDD(date: Date): string {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
		const day = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	};

	public static convertDateToHHMM(date: Date): string {
		// Extract the hours and minutes in local time
		const hours = date.getHours().toString().padStart(2, '0'); // Add leading zero if necessary
		const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if necessary

		// Format it as hh:mm
		return `${hours}:${minutes}`;
	};

	// use date pipe!!  | date: 'EEEE, dd/MM/yyyy, hh:mm a'

	public static getOrdinalNumber(index: number) {
		const number = index + 1; // Convert index to human-readable number
		const suffixes = ['th', 'st', 'nd', 'rd'];
		const remainder = number % 100; // Handle special cases for 11th, 12th, 13th

		// Determine the correct suffix
		const suffix = suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];

		return number + suffix;
	}

	// public static getUtcOffsetInHours(): number {
	// 	return (new Date().getTimezoneOffset() * -1) / 60;
	// }

	public static getTimezone(): string {
		return Intl.DateTimeFormat().resolvedOptions().timeZone;
	}

	public static copyToClipboard(text: string) {
		return new Promise((resolve, reject) => {
			// Check if the clipboard API is supported by the browser
			if (navigator.clipboard) {
				navigator.clipboard.writeText(text).then(() => {
					// console.log('Text copied to clipboard!');
					resolve(true);  // Resolve the promise with true
				}).catch(err => {
					// console.error('Failed to copy text to clipboard', err);
					resolve(false);  // Resolve the promise with false in case of an error
				});
			} else {
				// Fallback method for older browsers that don't support clipboard API
				const textArea = document.createElement('textarea');
				textArea.value = text;
				document.body.appendChild(textArea);
				textArea.select();
				try {
					document.execCommand('copy');
					// console.log('Text copied to clipboard!');
					resolve(true);  // Resolve the promise with true
				} catch (err) {
					// console.error('Failed to copy text to clipboard', err);
					resolve(false);  // Resolve the promise with false in case of an error
				}
				document.body.removeChild(textArea);
			}
		});
	}
}

export class ConstantsType {
	Id!: number;
	Name!: string;
}