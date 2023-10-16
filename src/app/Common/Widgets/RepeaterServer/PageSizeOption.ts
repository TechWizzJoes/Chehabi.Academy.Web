import { Component, OnInit } from '@angular/core';
import { RepeaterServer } from './RepeaterServer';

@Component({
	selector: 'PageSizeOption',
	template: `
		<ul class="pagination">
			<li
				*ngFor="let pageSize of RepeaterServer.GridOptions.PageSizeOptions"
				class="page-item"
				[ngClass]="{ active: pageSize === RepeaterServer.GridOptions.PageSize }">
				<a href="javascript:;" class="page-link" (click)="ChangePageSize(pageSize)">{{ pageSize }}</a>
			</li>
		</ul>
	`
})
export class PageSizeOption implements OnInit {
	constructor(public RepeaterServer: RepeaterServer) {}

	ngOnInit() {}

	ChangePageSize(pageSize: number) {
		if (this.RepeaterServer.GridOptions.PageSize != pageSize) {
			this.RepeaterServer.GridOptions.PageSize = pageSize;
			this.RepeaterServer.GridOptions.PageIndex = 0;
			this.RepeaterServer.GridOptionsChange.emit(this.RepeaterServer.GridOptions);
			this.RepeaterServer.Render();
		}
	}
}
