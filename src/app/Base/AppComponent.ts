import { Component, Renderer2 } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { PlatformLocation } from '@angular/common';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { LangService } from '@App/Common/Services/Lang.Service';
// import { NotifyService } from '@App/Common/Services/Notify.Service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-root',
	templateUrl: './App.Component.html'
})
export class AppComponent {
	constructor(
		Router: Router,
		// private Renderer2: Renderer2,
		private modalService: NgbModal,
		private PlatformLocation: PlatformLocation // private LangService: LangService, // private NotifyService: NotifyService, // private modalService: NgbModal
	) {}

	ngOnInit() {
		// this.LangService.SetDefaultLang(this.Renderer2, 'ar');
		this.PlatformLocation.onPopState((event) => {
			if (this.modalService.hasOpenModals()) this.modalService.dismissAll();
		});
	}
}
