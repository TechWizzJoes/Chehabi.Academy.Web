import { Component, } from '@angular/core';
import { Router, } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	templateUrl: './App.Component.html'
})
export class AppComponent {
	constructor(
		private modalService: NgbModal,
		private PlatformLocation: PlatformLocation,
		private translate: TranslateService
	) {
		console.log(`browser's language: ${translate.getBrowserLang()}`);
		let browserLang = translate.getBrowserLang()
		translate.setDefaultLang('en');
		translate.use(browserLang ?? 'en');
	}

	ngOnInit() {
		this.PlatformLocation.onPopState((event) => {
			if (this.modalService.hasOpenModals()) this.modalService.dismissAll();
		});
	}
}
