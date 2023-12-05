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
import { RoutePaths } from '@App/Common/Settings/RoutePaths';

@Component({
	selector: 'app-root',
	templateUrl: './App.Component.html'
})
export class AppComponent {
	private readonly VAPID_PUBLIC_KEY: string = 'BHECh-IJilGwLFwpKQhlsHvqT939nhAcVtU4DW63QimcoT0qsdk_po8_QYgrUjercp8hvwiZHSeTwtx-4HT3J2g'
	IsLoaded: boolean = false;
	ErrorToast!: number;
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
		this.PreLoaderListener();
		this.ScrollUpSub();
		this.CheckIOS();
		this.ScrollChanges();

		setTimeout(() => {
			this.ConnectionSub();
			this.UpdateVersionPrompt();
			this.PushNotificationSub();
		}, 0);

	}

	PreLoaderListener() {
		const startTime = new Date().getTime();
		setTimeout(() => {
			this.IsLoaded = true;
		}, 5000);
		// Add an event listener to execute code when the window is loaded
		window.addEventListener('load', () => {
			const currentTime = new Date().getTime();
			const elapsedTime = currentTime - startTime;

			const minLoadingTime = 1000;
			if (elapsedTime >= minLoadingTime) {
				this.IsLoaded = true;
			} else {
				setTimeout(() => {
					this.IsLoaded = true;
				}, minLoadingTime - elapsedTime);
			}
		});
	}

	ScrollUpSub() {
		this.Router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				// Scroll to the top of the page when a new route is navigated
				window.scrollTo(0, 0);
			}
		});
	}

	ConnectionSub() {
		addEventListener('offline', e => {
			this.ErrorToast = this.NotifyService.Error('No internet connection', '', 0);
		});

		addEventListener('online', e => {
			this.NotifyService.RemoveToast(this.ErrorToast);
			this.NotifyService.Success('Re-connected');
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

		this.swPush.messages.subscribe(message => console.log)

		this.swPush.notificationClicks.subscribe(
			({ action, notification }) => {
				// do whatever you want according to the action or the notification
				// but don't use httpclient, only fetch() due to SW limitations
				console.log(notification); // the whole not object payload
				if (action === "go") {
					this.Router.navigate(['/', RoutePaths.Courses])
				}
			}
		)

	}

	CheckIOS() {
		// Check if the user is using an iOS device
		function isIOS() {
			return /iPad|iPhone|iPod/.test(navigator.userAgent);
		}

		// Add a class to the body if it's an iOS device
		if (isIOS()) {
			document.body.classList.add('ios-device');
		}
	}

	ScrollChanges() {
		window.addEventListener("scroll", function () {
			const navbar = document.querySelector(".navbar");
			const body = document.querySelector("body");
			if (window.scrollY > 1) {
				navbar?.classList.add("navbar-scrolled");
				body!.style.backgroundColor = 'var(--primary-color1)'
			} else {
				navbar?.classList.remove("navbar-scrolled");
				body!.style.backgroundColor = ''
			}
		});
	}

}
