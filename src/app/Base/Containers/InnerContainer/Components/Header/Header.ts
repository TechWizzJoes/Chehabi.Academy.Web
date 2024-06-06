import { AuthModels } from '@App/Common/Models/Auth.Models';
import { AuthService } from '@App/Common/Services/Auth.Service';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export class Language {
	Name!: string;
	Key!: string;
}
@Component({
	selector: 'app-header',
	templateUrl: './Header.html',
	styleUrls: ['./Header.scss'],
})
export class HeaderComponent implements OnInit {
	CurrentUser!: AuthModels.CurrentUserResModel
	@ViewChild('NavbarCollapse') NavbarCollapse!: ElementRef;
	RoutePaths = RoutePaths

	AvailableLanguages: Language[] = [{ Name: 'English', Key: 'en' }, { Name: 'German', Key: 'de' }]

	constructor(
		private Router: Router,
		protected AuthService: AuthService,
		private socialAuthService: SocialAuthService,
		private TranslateService: TranslateService
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
			console.log(this.AuthService.CurrentUser)
			this.CurrentUser = this.AuthService.CurrentUser;
		})
	}

	goToProfile() {
	}

	goToSettings() {
	}

	useLanguage(language: string): void {
		this.TranslateService.use(language);
	}

	signOut() {
		this.AuthService.SignOut();
		this.Router.navigate([RoutePaths.Login])
	}
}
