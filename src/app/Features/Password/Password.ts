import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageEnum, StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { UserModels } from '@App/Common/Models/User.Models';
import { ErrorCodesEnum } from '@App/Common/Enums/ErrorCodes.Enum';
import { AuthModels } from '@App/Common/Models/Auth.Models';

@Component({
	standalone: true,
	templateUrl: './Password.html',
	styleUrls: ['Password.scss'],
	imports: [FormsModule, CommonModule, LoaderComponent]
})
export class PasswordComponent implements OnInit {
	Account: AuthModels.CurrentUserResModel = new AuthModels.CurrentUserResModel();
	Error!: string;
	Password: { OldPassword: string, NewPassword: string, ReNewPassword: string } = { OldPassword: '', NewPassword: '', ReNewPassword: '' };

	constructor(
		private Router: Router,
		private ActivatedRoute: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		private AuthService: AuthService,
		private StorageService: StorageService
	) { }

	ngOnInit() {
		this.Account = this.AuthService.CurrentUser;
	}

	onSubmit(form: NgForm) {
		if (form.invalid) {
			this.Error = ErrorCodesEnum.FILL_REQUIRED_FIELDS;
			return;
		}

		if (this.Password.NewPassword !== this.Password.ReNewPassword) {
			this.Error = ErrorCodesEnum.PASSWORD_NOT_MATCH;
			return;
		}

		let requestModel = {
			Id: this.Account.Id,
			OldPassword: this.Password.OldPassword,
			NewPassword: this.Password.NewPassword,
			ReNewPassword: this.Password.ReNewPassword,
		} as AuthModels.ResetPasswordReqModel;

		let httpEndPoint = HttpEndPoints.Account.ResetPassword;
		this.HttpService.Post<AuthModels.ResetPasswordReqModel, AuthModels.LoginResModel>(
			httpEndPoint,
			requestModel,
		).subscribe({
			next: (response) => {
				console.log(response);
			},
			error: (errorResponse) => {
				// to show the error on login panel
				this.Error = Object.values(ErrorCodesEnum)[Object.keys(ErrorCodesEnum).indexOf(errorResponse.error)];
			}
		});
	}
}