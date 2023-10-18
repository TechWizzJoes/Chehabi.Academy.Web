import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { HttpService } from '@App/Common/Services/Http.Service';
import { AuthModels } from '@App/Common/Models/Auth.Models';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { AuthService } from '@App/Common/Services/Auth.Service';

import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { ErrorCodesEnum } from '@App/Common/Enums/ErrorCodes.Enum';
import { CommonModule } from '@angular/common';
import { Constants } from '@App/Common/Settings/Constants';

@Component({
	standalone: true,
	imports: [FormsModule, CommonModule, RouterModule],
	templateUrl: './Login.html',
	styleUrls: ['./Login.scss']
})
export class LoginComponent {
	RoutePaths = RoutePaths;
	Year = Constants.GetYear();

	Error!: string;
	showPW: boolean = false;
	PWInputType: string = 'password';

	Credentials = new AuthModels.LoginModel('', '');
	ReturnUrl: any;

	constructor(
		private Router: Router,
		private ActivatedRoute: ActivatedRoute,
		private HttpService: HttpService,
		private NotifyService: NotifyService,
		private AuthService: AuthService
	) { }

	ngOnInit() {
		this.AuthService.SignOut();
	}

	toggleShowPW() {
		this.showPW = this.showPW ? false : true;
		this.PWInputType = this.PWInputType == 'password' ? 'text' : 'password';
	}

	Login(frm: NgForm) {
		if (frm.invalid) {
			// this.NotifyService.Error('InvalidFormMsg');
			this.Error = ErrorCodesEnum.FILL_REQUIRED_FIELDS;
			return;
		}

		let requestModel = {
			Email: this.Credentials.Email.trim(),
			Password: this.Credentials.Password.trim()
		} as AuthModels.LoginReqModel;
		this.ReturnUrl = this.ActivatedRoute.snapshot.queryParams['returnUrl'];
		let httpEndPoint = HttpEndPoints.Account.Login;
		this.HttpService.Post<AuthModels.LoginReqModel, AuthModels.LoginResModel>(
			httpEndPoint,
			requestModel,
		).subscribe({
			next: (response) => {
				console.log(response);
				this.AuthService.SignIn(response);
				this.NavigateTo(response.CurrentUser);
			},
			error: (errorResponse) => {
				// to show the error on login panel
				this.Error = Object.values(ErrorCodesEnum)[Object.keys(ErrorCodesEnum).indexOf(errorResponse.error)];
			}
		});
	}

	NavigateTo(currentUser: AuthModels.CurrentUserResModel) {
		// const isAdmin = currentUser.IsAdmin;
		const route = !!this.ReturnUrl ? this.ReturnUrl : RoutePaths.Default;
		// const route = (!!returnUrl) ? returnUrl : this.AuthService.GetRoleDefaultRoute(role);
		this.Router.navigateByUrl(route);
	}
}
