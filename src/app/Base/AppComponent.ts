import { Component, } from '@angular/core';
import { Router, } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-root',
	templateUrl: './App.Component.html'
})
export class AppComponent {
	constructor(
		private modalService: NgbModal,
		private PlatformLocation: PlatformLocation
	) { }

	ngOnInit() {
		this.PlatformLocation.onPopState((event) => {
			if (this.modalService.hasOpenModals()) this.modalService.dismissAll();
		});
	}
}
