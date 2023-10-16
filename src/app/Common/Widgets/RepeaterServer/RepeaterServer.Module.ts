import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RepeaterServer } from './RepeaterServer';
import { SortField } from './SortField';
import { Pagination } from './Pagination';
import { PageSizeOption } from './PageSizeOption';
import { PagingLabel } from './PagingLabel';

@NgModule({
	imports: [FormsModule, CommonModule, NgbModule],
	declarations: [RepeaterServer, SortField, Pagination, PageSizeOption, PagingLabel],
	entryComponents: [],
	providers: [],
	exports: [RepeaterServer, SortField, Pagination, PageSizeOption, PagingLabel]
})
export class RepeaterServerModule {}
