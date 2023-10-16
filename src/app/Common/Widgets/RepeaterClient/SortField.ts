import { Component, Input } from '@angular/core';
import { RepeaterClient } from './RepeaterClient';

@Component({
	selector: 'sort-field-client',
	template: `
		<a (click)="Sort()">
			<ng-content></ng-content>&nbsp;
			<i class="fa" [ngClass]="GetSortedIcon()"></i>
		</a>
	`
})
export class SortField {
	@Input() field: any;

	constructor(public table: RepeaterClient) {}

	Sort() {
		if (this.table.gridOptions.SortField === this.field) {
			this.table.gridOptions.SortOrder = this.table.gridOptions.SortOrder === 'Desc' ? 'Asc' : 'Desc';
		} else {
			this.table.gridOptions.SortField = this.field;
			this.table.gridOptions.SortOrder = 'Asc';
		}
	}

	GetSortedIcon() {
		if (this.field === this.table.gridOptions.SortField) {
			return this.table.gridOptions.SortOrder === 'Asc' ? 'fa-sort-asc' : 'fa-sort-desc';
		}
		return 'fa-sort';
	}
}
