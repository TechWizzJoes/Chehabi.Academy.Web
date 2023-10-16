import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { RepeaterServer } from './RepeaterServer';

@Component({
	selector: 'export-csv',
	template: `
		<button title="Export" class="btn btn-xs btn-csv" (click)="GetData()">
			<i class="fa fa-file-excel-o"></i>
		</button>
	`
})
export class ExportCsv implements OnInit {
	@Input() DataSource: any;
	@Input('options') Options: any;
	@Output() GetDataSource: EventEmitter<any> = new EventEmitter<any>();

	constructor(public RepeaterServer: RepeaterServer) {}

	ngOnInit() {}

	GetData() {
		this.GetDataSource.emit();
	}

	ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
		if (changes['DataSource'] && this.DataSource && this.DataSource.length > 0) {
			this.Export();
		}
	}

	Export() {
		const self = this;
		let exportedRows: any = [];

		this.DataSource.map((row: any) => {
			let orderedRow: any = {};
			for (let coulmn in self.Options.Columns) {
				const colmnName = self.Options.Columns[coulmn];
				orderedRow[colmnName] = row[colmnName];
			}
			exportedRows.push(orderedRow);
		});

		const options = {
			filename: this.Options.Filename,
			headers: this.Options.Headers
		};
		// new Angular2Csv(exportedRows, options.filename, options);
	}
}
