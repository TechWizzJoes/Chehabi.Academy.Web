import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from './DatePicker';
import { DirectivesModule } from '@App/Common/Directives/Directives.Module';

@NgModule({
	imports: [FormsModule, CommonModule, NgSelectModule, DirectivesModule, NgbDatepickerModule],
	declarations: [DatePickerComponent],
	entryComponents: [],
	providers: [],
	exports: [DatePickerComponent]
})
export class DatePickerModule {}
