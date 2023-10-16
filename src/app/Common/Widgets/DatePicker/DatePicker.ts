import {
	Component,
	Injectable,
	Input,
	OnInit,
	Output,
	EventEmitter,
	ChangeDetectorRef,
	SimpleChanges,
	OnChanges
} from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'date-picker',
	templateUrl: './DatePicker.html',
	styleUrls: ['./DatePicker.scss']
})
export class DatePickerComponent implements OnInit, OnChanges {
	@Input() IsRequired: any;
	@Input() IsDisabled!: boolean;
	@Input() Placeholder: any = 'DateFormate';
	@Input() Date: any;
	@Input() MinDate: Date | string | null = null;
	@Input() MaxDate: Date | string | null = null;

	@Output() DateChange: EventEmitter<any> = new EventEmitter<any>();
	@Output() InValid: EventEmitter<any> = new EventEmitter<any>();

	Language: any;
	DateObj?: NgbDateStruct | null;
	MinDateObj!: NgbDateStruct;
	MaxDateObj!: NgbDateStruct;

	constructor(private changeRef: ChangeDetectorRef) {}

	GetDateObject(dateString: Date | string | null) {
		let dateObj: any = { day: null, month: null, year: null };
		if (dateString) {
			let date = new Date(dateString);
			dateObj.day = date.getDate();
			dateObj.month = date.getMonth() + 1;
			dateObj.year = date.getFullYear();
		}
		return dateObj;
	}

	ngOnInit() {
		this.DateObj = this.GetDateObject(this.Date);
		this.MinDateObj = this.MinDate ? this.GetDateObject(this.MinDate) : { day: 1, month: 1, year: 1900 };
		this.MaxDateObj = this.MaxDate ? this.GetDateObject(this.MaxDate) : null;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['Date']) {
			this.DateObj = this.GetDateObject(this.Date);
		}
		// else if(changes['MinDate'] && changes['MinDate'].currentValue !== null) {
		// 	this.MinDateObj = (this.MinDate) ? this.GetDateObject(this.MinDate) : { day: 1, month: 1, year: 1900 };
		// 	// if(changes['MinDate'].previousValue !== null) {
		// 	// 	this.DateObj = this.GetDateObject(this.MinDate);
		// 	// }
		// }else if(changes['MinDate'].currentValue == null) {
		// 	this.MinDateObj = { day: 1, month: 1, year: 1900 };
		// }
	}

	ngAfterViewChecked() {
		this.changeRef.detectChanges();
		if (this.IsRequired && !this.Date) {
			this.InValid.emit(true);
		}
	}

	ChangeDate() {
		let dateObj: any = this.DateObj;
		if (dateObj.year && dateObj.month && dateObj.day) {
			let dateUtc = new Date(Date.UTC(dateObj.year, dateObj.month - 1, dateObj.day, 12));
			this.DateChange.emit(dateUtc);
			if (this.IsRequired) {
				this.InValid.emit(false);
			}
		} else {
			this.DateChange.emit();
			if (this.IsRequired) {
				this.InValid.emit(true);
			}
		}
	}

	Cancel() {
		this.DateObj = null;
		if (this.IsRequired) {
			this.InValid.emit(false);
		}
		this.DateChange.emit(null);
	}
}
