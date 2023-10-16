import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-no-data-found',
	templateUrl: './NoDataFound.html',
	standalone: true,
	imports: [FormsModule, CommonModule]
})
export class NoDataFoundComponent {
	@Input('Error') ErrorText = '';
	@Output('Retry') Retry: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor() {}

	OnRetry() {
		this.Retry.emit(true);
	}
}
