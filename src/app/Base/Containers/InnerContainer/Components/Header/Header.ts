import { AuthModels } from '@App/Common/Models/Auth.Models';
import { AuthService } from '@App/Common/Services/Auth.Service';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { CartButtonComponent } from '@App/Common/Widgets/Cart/cart-button/cart-button.component';
import { LanguagePopUpComponent } from '@App/Common/Widgets/LanguagePopUp/LanguagePopUp';
import { NotificationButtonComponent } from '@App/Common/Widgets/NotificationButton/NotificationButton';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	standalone: true,
	selector: 'app-header',
	templateUrl: './Header.html',
	styleUrls: ['./Header.scss'],
	imports: [
		CommonModule,
		FormsModule,
		NgbPopoverModule,
		RouterModule,
		TranslateModule,
		CartButtonComponent,
		LanguagePopUpComponent,
		NotificationButtonComponent,
	]
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
