import { AuthModels } from '@App/Common/Models/Auth.Models';
import { AuthService } from '@App/Common/Services/Auth.Service';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any; // Declare jQuery as any type

@Component({
	selector: 'app-header',
	templateUrl: './Header.html',
	styleUrls: ['./Header.scss'],
})
export class HeaderComponent {
	CurrentUser: AuthModels.CurrentUserResModel
	@ViewChild('NavbarCollapse') NavbarCollapse!: ElementRef;
	RoutePaths = RoutePaths
	constructor(
		private Router: Router,
		protected AuthService: AuthService,
		private socialAuthService: SocialAuthService
	) {
		window.addEventListener("scroll", function () {
			const navbar = document.querySelector(".navbar");
			if (window.scrollY > 56) {
				navbar?.classList.add("navbar-scrolled");
			} else {
				navbar?.classList.remove("navbar-scrolled");
			}
		});

		this.CurrentUser = this.AuthService.CurrentUser
	}

	goToProfile() {
	}

	goToSettings() {
	}

	signOut() {
		this.AuthService.SignOut();
		if (this.AuthService.isGoogleLoggedin)
			this.socialAuthService.signOut();
		this.Router.navigate([RoutePaths.Login])
	}
}
