import { Component, Input } from '@angular/core';

import { SortOrderEnum } from './GridOptionsModel';
import { RepeaterServer } from './RepeaterServer';

@Component({
	selector: 'sort-field',
	template: `
		<a (click)="Sort()">
			<ng-content></ng-content>&nbsp;
			<i class="fa" [ngClass]="GetSortedIcon()"></i>
		</a>
	`
})
export class SortField {
	@Input() SortField!: string;

	constructor(public RepeaterServer: RepeaterServer) {}

	Sort() {
		if (this.RepeaterServer.GridOptions.SortField === this.SortField) {
			this.RepeaterServer.GridOptions.SortOrder =
				this.RepeaterServer.GridOptions.SortOrder === SortOrderEnum.Desc
					? SortOrderEnum.Asc
					: SortOrderEnum.Desc;
		} else {
			this.RepeaterServer.GridOptions.SortField = this.SortField;
			this.RepeaterServer.GridOptions.SortOrder = SortOrderEnum.Asc;
		}
		this.RepeaterServer.GridOptionsChange.emit(this.RepeaterServer.GridOptions);
	}

	GetSortedIcon() {
		if (this.SortField === this.RepeaterServer.GridOptions.SortField) {
			return this.RepeaterServer.GridOptions.SortOrder === SortOrderEnum.Asc ? 'fa-sort-asc' : 'fa-sort-desc';
		}
		return 'fa-sort';
	}
}
