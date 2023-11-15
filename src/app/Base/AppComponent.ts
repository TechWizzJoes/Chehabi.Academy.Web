import { ApplicationRef, Component, } from '@angular/core';
import { NavigationEnd, Router, } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { SwPush, SwUpdate, VersionEvent } from '@angular/service-worker';
import { HttpService } from '@App/Common/Services/Http.Service';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';

@Component({
	selector: 'app-root',
	templateUrl: './App.Component.html'
})
export class AppComponent {
	private readonly VAPID_PUBLIC_KEY: string = 'BHECh-IJilGwLFwpKQhlsHvqT939nhAcVtU4DW63QimcoT0qsdk_po8_QYgrUjercp8hvwiZHSeTwtx-4HT3J2g'

	constructor(
		private modalService: NgbModal,
		private PlatformLocation: PlatformLocation,
		private translate: TranslateService,
		private Router: Router,
		private socialAuthService: SocialAuthService,
		private NotifyService: NotifyService,
		private swUpdate: SwUpdate,
		private swPush: SwPush,
		private appRef: ApplicationRef,
		private HttpService: HttpService
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

		setTimeout(() => {
			this.ConnectionSub();
			this.UpdateVersionPrompt();
			this.PushNotificationSub();

		}, 0);
	}

	ConnectionSub() {
		addEventListener('offline', e => {
			this.NotifyService.Error('No internet connection');
		});

		addEventListener('online', e => {
			this.NotifyService.Success('Rconnected');
		})
	}

	UpdateVersionPrompt() {
		if (this.swUpdate.isEnabled) {
			this.swUpdate.versionUpdates.subscribe(async (value: VersionEvent) => {
				console.log(value);

				if (value.type == 'VERSION_READY') {
					const version = ((value.currentVersion.appData) as any).version
					const latestVersion = ((value.latestVersion.appData) as any).version
					console.log('version ready');

					if (await this.NotifyService.Confirm('Version Update', `New version ${latestVersion} available.\n Load New Version?`, 'Update Now', 'Later')) {
						window.location.reload();
					}

				}
			});
		}
	}

	PushNotificationSub() {
		this.swPush.requestSubscription({
			serverPublicKey: this.VAPID_PUBLIC_KEY
		}).then(sub => {

			console.log(sub);

			return this.HttpService.Post(HttpEndPoints.Notifications.Subscribe, sub).subscribe({
				next: data => {
					console.log("subscribed to push notification successfully");
				},
				error: err => console.log(err)
			});
		}).catch(console.log);
	}

}
