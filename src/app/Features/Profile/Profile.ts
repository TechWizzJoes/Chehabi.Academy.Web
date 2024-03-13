import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { UserModels } from '@App/Common/Models/User.Models';
import { ErrorCodesEnum } from '@App/Common/Enums/ErrorCodes.Enum';

@Component({
	standalone: true,
	templateUrl: './Profile.html',
	styleUrls: ['Profile.scss'],
	imports: [FormsModule, CommonModule, LoaderComponent]
})
export class ProfileComponent implements OnInit {
	IsLoaded: boolean = false;
	Account: UserModels.User = new UserModels.User();
	Error!: string;

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
		let endPoint = HttpEndPoints.Profile.GetProfile
		endPoint = endPoint.replace('{id}', this.AuthService.CurrentUser.Id.toString())
		this.HttpService.Get<UserModels.User>(endPoint).subscribe(data => {
			this.IsLoaded = true
			this.Account = data;
		})
	}

	onProfilePicChange(event: any) { }

	onSubmit(form: NgForm) {
		if (form.invalid) {
			this.Error = ErrorCodesEnum.FILL_REQUIRED_FIELDS;
			return;
		}

		let newProfile = new UserModels.UserReqModel();
		newProfile.Id = this.Account.Id;
		newProfile.FirstName = this.Account.FirstName;
		newProfile.LastName = this.Account.LastName;
		newProfile.Birthdate = this.Account.Birthdate;
		newProfile.Email = this.Account.Email;
		newProfile.ProfilePicturePath = this.Account.ProfilePicturePath;


		let httpEndPoint = HttpEndPoints.Profile.EditProfile;
		this.HttpService.Put<UserModels.UserReqModel>(
			httpEndPoint,
			newProfile,
		).subscribe({
			next: (response) => {
				console.log(response);
			},
			error: (errorResponse) => {
				this.Error = Object.values(ErrorCodesEnum)[Object.keys(ErrorCodesEnum).indexOf(errorResponse.error)];
			}
		});
	}
}
