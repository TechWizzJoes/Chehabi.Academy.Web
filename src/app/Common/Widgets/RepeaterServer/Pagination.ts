import { ChangeDetectorRef, Component } from '@angular/core';
import { RepeaterServer } from './RepeaterServer';

@Component({
	selector: 'Pagination',
	template: `
		<ngb-pagination
			[collectionSize]="RepeaterServer.GridOptions.Count"
			[pageSize]="RepeaterServer.GridOptions.PageSize"
			[page]="GetCurrentPage()"
			[boundaryLinks]="true"
			[maxSize]="2"
			[boundaryLinks]="false"
			[ellipses]="true"
			(pageChange)="PageChanged($event - 1)">
		</ngb-pagination>
	`
})
export class Pagination {
	constructor(public RepeaterServer: RepeaterServer) {}

	GetCurrentPage() {
		return this.RepeaterServer.GridOptions.PageIndex + 1;
	}

	PageChanged(pageIndex: number) {
		if (this.RepeaterServer.GridOptions.PageIndex != pageIndex) {
			this.RepeaterServer.GridOptions.PageIndex = pageIndex;
			this.RepeaterServer.GridOptionsChange.emit(this.RepeaterServer.GridOptions);
		}
	}
}
