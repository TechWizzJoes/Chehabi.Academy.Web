import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

enum EventType {
	None = '',
	Practice = 'practice',
	Session = 'session',
	Review = 'review'
}
interface EventBase {
	startDate: string | number | Date;
	date: Date;
	title: string;
	description: string;
	type: string;
	time?: string;
	period?: string;
}

@Component({
	standalone: true,
	selector: 'app-calendar',
	templateUrl: './Calendar.html',
	styleUrls: ['./Calendar.scss'],
	imports: [FormsModule, CommonModule, NgxChartsModule]
})
export class CalendarComponent<T extends EventBase> implements OnInit {
	@Input() events: T[] = [];
	currentMonth: number;
	currentYear: number;
	currentDate: Date = new Date();
	monthYear: string | undefined;
	calendarDays: { day: number; dayName: string; event?: T }[] = [];
	selectedDate: Date | null = null;

	selectedDay: { day: number; dayName: string; event?: T } | null = null;
	selectedEventHour: number | null = null;
	sessionDates: string = '';

	hours = Array.from({ length: 24 }, (_, i) => i);

	expandedView: boolean = false;

	selectedDayEvents: T[] = [];
	private eventCache: { [key: number]: any } = {};
	demoEvents: T[] = [
		{ date: new Date(2024, 8, 4, 9, 0), title: 'Morning Class', description: 'Discussion on project progress', time: '09:30 AM', type: 'session' } as T,
		{ date: new Date(2024, 8, 10, 14, 0), title: 'Practice Session', description: 'Review practice problems', time: '02:00 PM', type: 'practice' } as T,
		{ date: new Date(2024, 8, 15, 11, 0), title: 'Lecture', description: 'Global Economics overview', time: '11:00 AM', type: 'review' } as T,
	];

	constructor() {
		this.currentMonth = this.currentDate.getMonth();
		this.currentYear = this.currentDate.getFullYear();
	}

	ngOnInit() {
		if (this.events.length === 0) {
			this.events = this.demoEvents; // Use demo data if no events are provided
		}
		this.generateCalendar(this.currentMonth, this.currentYear);
		this.updateSessionDates();
	}

	generateCalendar(month: number, year: number) {
		this.calendarDays = [];
		this.monthYear = `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
			new Date(year, month)
		)} ${year}`;
		const firstDay = new Date(year, month).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();

		for (let i = 0; i < firstDay; i++) {
			this.calendarDays.push({ day: 0, dayName: '' }); // Empty days for padding
		}

		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(year, month, day);
			const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
			const event = this.events.find((event: T) =>
				this.eventMatchesDate(event, day)
			);
			this.calendarDays.push({ day, dayName, event });
		}
	}

	updateSessionDates() {
		this.sessionDates = this.events
			.map(event => `${event.date.toDateString()}: ${event.title}`)
			.join(', ');
	}

	prevMonth() {
		this.currentMonth--;
		if (this.currentMonth < 0) {
			this.currentMonth = 11;
			this.currentYear--;
		}
		this.generateCalendar(this.currentMonth, this.currentYear);
		this.updateSessionDates();
	}

	nextMonth() {
		this.currentMonth++;
		if (this.currentMonth > 11) {
			this.currentMonth = 0;
			this.currentYear++;
		}
		this.generateCalendar(this.currentMonth, this.currentYear);
		this.updateSessionDates();
	}

	eventMatchesDate(event: T, day: number): boolean {
		return (
			event.date.getDate() === day &&
			event.date.getMonth() === this.currentMonth &&
			event.date.getFullYear() === this.currentYear
		);
	}

	onDateChange(event: Event | any) {
		const input = event.target as HTMLInputElement;
		if (input.value) {
			this.jumpToDate(input.value);
		}
	}

	jumpToDate(dateString: string) {
		const date = new Date(dateString);
		this.currentMonth = date.getMonth();
		this.currentYear = date.getFullYear();
		this.selectedDate = date; // Highlight the selected date
		this.generateCalendar(this.currentMonth, this.currentYear);
		this.updateSessionDates();
	}

	onEventClick(event: T) {
		console.log('Event clicked:', event);
		// Handle event click logic here
		this.expandDayView(event.date.getDate());
	}
	selectDay(day: { day: number }) {
		if (day.day !== 0) {
			this.selectedDate = new Date(this.currentYear, this.currentMonth, day.day);
		}
	}

	onDayClick(day: { day: number; dayName: string; event?: T }) {
		this.selectedDay = day;
		this.selectedEventHour = day.event ? new Date(day.event.date).getHours() : null;
	}

	expandDayView(day: number) {
		// Clear previous selected day events
		this.selectedDayEvents = [];

		// Find all events that match the selected day of the month
		this.selectedDayEvents = this.events.filter(event => {
			const eventDate = new Date(event.date);
			return (
				eventDate.getDate() === day &&
				eventDate.getMonth() === this.currentMonth &&
				eventDate.getFullYear() === this.currentYear
			);
		});

		this.expandedView = true;
	}

	getEventForHour(hour: number) {
		if (this.eventCache[hour]) {
			return this.eventCache[hour];
		}


		const eventForHour = this.selectedDayEvents?.find(event => {
			const eventHour = new Date(event.date).getHours();
			return eventHour === hour;
		});

		this.eventCache[hour] = eventForHour;
		return eventForHour;
	}


	closeExpandedView() {
		this.expandedView = false;
	}


}
