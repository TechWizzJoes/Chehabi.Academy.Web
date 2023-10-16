import { Component, Input } from '@angular/core';
import { RepeaterClient } from './RepeaterClient';

@Component({
	selector: 'PagingLabel-client',
	template: `
		<span class="table-box-paging-label">
			{{ getStart() }} - {{ getEnd() }} of {{ table.dataSource.length }} {{ RowLabel }}
		</span>
	`
})
export class PagingLabel {
	@Input() RowLabel: string = 'Rows';
	constructor(public table: RepeaterClient) {}

	getStart() {
		return this.table.start + 1;
	}

	getEnd() {
		return this.table.end;
	}
}
