import { Component, OnInit, Input, SimpleChange, OnChanges, Output, EventEmitter } from '@angular/core';
import { GridOptionsModel } from './GridOptionsModel';

@Component({
	selector: 'repeater-server',
	template: `<ng-content></ng-content>`
})
export class RepeaterServer implements OnInit, OnChanges {
	@Input() GridOptions!: GridOptionsModel;
	@Output() GridOptionsChange: EventEmitter<GridOptionsModel> = new EventEmitter<GridOptionsModel>();

	start: number | any;
	end: number | any;

	constructor() {}

	ngOnInit() {}

	ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
		if (changes['GridOptions']) {
			this.Render();
		}
	}

	Render() {
		this.start = this.GridOptions.PageIndex * this.GridOptions.PageSize;
		this.end = this.start + this.GridOptions.PageSize;
		if (this.end > this.GridOptions.Count - 1) {
			//TBR
			this.end = this.GridOptions.Count;
		}
	}
}
