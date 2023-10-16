import {
	Component,
	OnInit,
	Input,
	SimpleChange,
	OnChanges,
	DoCheck,
	KeyValueDiffers,
	Output,
	EventEmitter
} from '@angular/core';

@Component({
	selector: 'repeater-client',
	template: ` <ng-content></ng-content> `
})
export class RepeaterClient implements OnInit, OnChanges, DoCheck {
	// to make the DisplayedRows a two way binding attribute
	@Input() DisplayedRows: any;
	@Output() DisplayedRowsChange: EventEmitter<any> = new EventEmitter<any>();

	@Input() dataSource: any;
	@Input() gridOptions: any;
	@Input() pageSizeOptions: any;

	start: number | any;
	end: number | any;
	differ: any;

	constructor(private differs: KeyValueDiffers) {
		this.differ = differs.find({}).create();
	}

	ngOnInit() {
		if (!!this.gridOptions.IsPaged) {
			if (!this.pageSizeOptions) {
				this.pageSizeOptions = [10, 25, 50, 100];
			}
		} else {
			this.pageSizeOptions = [Number.MAX_SAFE_INTEGER];
		}

		if (!this.gridOptions.PageIndex) {
			this.gridOptions.PageIndex = 0;
		}

		if (!this.gridOptions.PageSize) {
			this.gridOptions.PageSize = this.pageSizeOptions[0];
		}
	}

	ngDoCheck() {
		const changes = this.differ.diff(this.gridOptions);
		if (changes) {
			this.Render();
		}
	}

	ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
		if (changes['dataSource']) {
			this.Render();
		}
	}

	Render() {
		this.dataSource.sort((a: any, b: any) => {
			let firstElement = a,
				SecondElement = b;
			// to sort on multilevel object
			if (this.gridOptions.SortField.includes('.')) {
				let tree = this.gridOptions.SortField.split('.');
				for (const t of tree) {
					firstElement = firstElement[t];
					SecondElement = SecondElement[t];
				}
			} else {
				firstElement = a[this.gridOptions.SortField];
				SecondElement = b[this.gridOptions.SortField];
			}

			if (typeof a[this.gridOptions.SortField] === 'string') {
				(firstElement = a[this.gridOptions.SortField].toLowerCase()),
					(SecondElement = b[this.gridOptions.SortField].toLowerCase());
			}

			if (firstElement < SecondElement) {
				return -1;
			}
			if (firstElement > SecondElement) {
				return 1;
			}
			return 0;
		});

		if (this.gridOptions.SortOrder === 'Desc') {
			this.dataSource.reverse();
		}

		this.start = this.gridOptions.PageIndex * this.gridOptions.PageSize;
		this.end = this.start + this.gridOptions.PageSize;
		if (this.end > this.dataSource.length - 1) {
			this.end = this.dataSource.length;
		}
		const page = this.dataSource.slice(this.start, this.end);
		// return the value in the DisplayedRows variable
		this.DisplayedRowsChange.emit(page);
	}
}
