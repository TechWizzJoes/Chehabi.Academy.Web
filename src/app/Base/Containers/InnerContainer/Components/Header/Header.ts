import { AuthModels } from '@App/Common/Models/Auth.Models';
import { AuthService } from '@App/Common/Services/Auth.Service';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './Header.html',
	styleUrls: ['./Header.scss'],
})
export class HeaderComponent implements OnInit {
	CurrentUser!: AuthModels.CurrentUserResModel
	@ViewChild('NavbarCollapse') NavbarCollapse!: ElementRef;
	RoutePaths = RoutePaths

	constructor(
		private Router: Router,
		protected AuthService: AuthService,
		private socialAuthService: SocialAuthService
	) {

	}

	ngOnInit(): void {
		this.CurrentUser = this.AuthService.CurrentUser
		this.AuthService.CurrentUserSub.subscribe(isExisting => {
			if (isExisting) {
				this.CurrentUser = this.AuthService.CurrentUser;
			}
		});
		this.AuthService.ProfilePicUpdate.subscribe((data) => {
			// console.log(this.AuthService.CurrentUser)
			this.CurrentUser = this.AuthService.CurrentUser;
		})
	}

	goToProfile() {
	}

	goToSettings() {
	}

	signOut() {
		this.AuthService.SignOut();
		this.Router.navigate([RoutePaths.Login])
	}
}
