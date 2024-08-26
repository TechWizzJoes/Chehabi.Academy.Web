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

	public static formatDate(dateString: Date | string, gmtOffset?: number): string {
		// Parse the date string
		const date = new Date(dateString);

		// Adjust the time to your local timezone based on the GMT offset (in hours)
		// const localDate = new Date(date.getTime() + gmtOffset * 60 * 60 * 1000);
		const localDate = new Date(date.getTime());

		// Format the date to "Tuesday 20/08/2024 02:00 pm"
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long',    // Full weekday name
			year: 'numeric',    // Full year
			month: '2-digit',   // Month as two digits
			day: '2-digit',     // Day as two digits
			hour: '2-digit',    // Hour in 12-hour format
			minute: '2-digit',  // Minutes as two digits
			hour12: true        // 12-hour format with AM/PM
		};

		return new Intl.DateTimeFormat('en-GB', options).format(localDate);
	}

}
export class ConstantsType {
	Id!: number;
	Name!: string;
}