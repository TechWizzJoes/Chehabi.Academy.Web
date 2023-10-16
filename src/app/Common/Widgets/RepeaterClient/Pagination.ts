import { Component } from '@angular/core';
import { RepeaterClient } from './RepeaterClient';

@Component({
	selector: 'Pagination-client',
	template: `
		<ngb-pagination
			[collectionSize]="table.dataSource.length"
			[pageSize]="table.gridOptions.PageSize"
			[page]="getCurrentPage()"
			[boundaryLinks]="false"
			[maxSize]="2"
			[ellipses]="true"
			(pageChange)="pageChanged($event)">
		</ngb-pagination>
	`
})
export class Pagination {
	constructor(public table: RepeaterClient) {}

	getCurrentPage() {
		return this.table.gridOptions.PageIndex + 1;
	}

	pageChanged(currentPage: number) {
		this.table.gridOptions.PageIndex = currentPage - 1;
	}
}
