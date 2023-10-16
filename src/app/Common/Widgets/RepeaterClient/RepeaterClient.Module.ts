import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RepeaterClient } from './RepeaterClient';
import { SortField } from './SortField';
import { Pagination } from './Pagination';
import { PageSizeOption } from './PageSizeOption';
import { PagingLabel } from './PagingLabel';
import { ExportCsvClient } from './ExportCsvClient';

@NgModule({
	imports: [CommonModule, NgbModule],
	declarations: [RepeaterClient, SortField, Pagination, PageSizeOption, PagingLabel, ExportCsvClient],
	entryComponents: [],
	providers: [],
	exports: [RepeaterClient, SortField, Pagination, PageSizeOption, PagingLabel, ExportCsvClient]
})
export class RepeaterClientModule {}
