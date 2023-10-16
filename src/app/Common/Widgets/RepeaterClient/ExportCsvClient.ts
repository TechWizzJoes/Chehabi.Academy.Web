import { Component, Input, OnInit } from '@angular/core';
// import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { RepeaterClient } from './RepeaterClient';

@Component({
	selector: 'export-csv-client',
	template: `
		<button title="Export" class="btn btn-xs btn-csv" (click)="Export()">
			<i class="fa fa-file-excel-o"></i>
		</button>
	`
})
export class ExportCsvClient implements OnInit {
	@Input('options') Options: any;
	constructor(public table: RepeaterClient) {}

	ngOnInit() {}

	Export() {
		// 	const self = this;
		// 	let exportedRows: any = [];
		// 	this.table.dataSource.map((row: any) => {
		// 		let orderedRow: any = {};
		// 		for (let coulmn in self.Options.Columns) {
		// 			const colmnName = self.Options.Columns[coulmn];
		// 			orderedRow[colmnName] = row[colmnName];
		// 		}
		// 		exportedRows.push(orderedRow);
		// 	});
		// 	const options = {
		// 		filename: this.Options.Filename,
		// 		headers: this.Options.Headers
		// 	};
		// 	new Angular2Csv(exportedRows, options.filename, options);
	}
}
