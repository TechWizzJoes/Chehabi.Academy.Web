import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactFieldModels } from '@App/Common/Models/ContactFields.Models';
import { StorageEnum, StorageService } from '@App/Common/Services/Storage.Service';

@Component({
	selector: 'app-search-input',
	templateUrl: './SearchInput.html',
	styleUrls: ['./SearchInput.scss'],
	standalone: true,
	imports: [FormsModule, CommonModule]
})
export class SearchInputComponent {
	@Input() SearchText = '';
	@Output() SearchTextChanged: EventEmitter<string> = new EventEmitter<string>();

	constructor() {}
	TextChanged() {
		this.SearchTextChanged.emit(this.SearchText);
	}

	ClearSearch() {
		this.SearchText = '';
		this.SearchTextChanged.emit(this.SearchText);
	}
}
