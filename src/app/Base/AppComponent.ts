import { Component, } from '@angular/core';
import { NavigationEnd, Router, } from '@angular/router';
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
		private translate: TranslateService,
		private Router: Router
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
		this.Router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				// Scroll to the top of the page when a new route is navigated
				window.scrollTo(0, 0);
			}
		});
	}


}
