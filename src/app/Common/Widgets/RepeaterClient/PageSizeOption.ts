import { Component, OnInit } from '@angular/core';
import { RepeaterClient } from './RepeaterClient';

@Component({
	selector: 'PageSizeOption-client',
	template: `
		<ul class="pagination">
			<li
				*ngFor="let option of table.pageSizeOptions"
				class="page-item"
				[ngClass]="{ active: option === table.gridOptions.PageSize }">
				<a href="javascript:;" class="page-link" (click)="ChangePageSize(option)">{{ option }}</a>
			</li>
		</ul>
	`
})
export class PageSizeOption implements OnInit {
	constructor(public table: RepeaterClient) {}

	ngOnInit() {}

	ChangePageSize(option: number) {
		this.table.gridOptions.PageSize = option;
		// this.table.Render();
	}
}
