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
import { HttpEventType } from '@angular/common/http';
import { MessagesEnum } from '@App/Common/Enums/Messages.Enum';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ErrorMessagesEnum } from '@App/Common/Enums/ErrorMessages.Enum';

@Component({
	standalone: true,
	templateUrl: './EditProfile.html',
	styleUrls: ['EditProfile.scss'],
	imports: [FormsModule, CommonModule, TranslateModule]
})
export class EditProfileComponent implements OnInit {
	IsLoaded: boolean = false;
	Account: UserModels.User = new UserModels.User();
	IsDisabled: boolean = false;
	IsUploadDisabled: boolean = false;
	Error!: string;
	Progress: any = { start: 0, end: 100 }

	constructor(
		private Router: Router,
		private ActivatedRoute: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		private AuthService: AuthService,
		private StorageService: StorageService,
		private translate: TranslateService
	) { }

	ngOnInit() {
		let endPoint = HttpEndPoints.Profile.GetProfile
		endPoint = endPoint.replace('{id}', this.AuthService.CurrentUser.Id.toString())
		this.HttpService.Get<UserModels.User>(endPoint).subscribe(data => {
			this.IsLoaded = true
			this.Account = data;
		})
	}

	onFileChange(event: any) {
		let Image = event.target.files[0];

		let endPoint = HttpEndPoints.Profile.UploadImage;
		endPoint = endPoint.replace('{id}', this.Account.Id.toString())

		const formData = new FormData();
		formData.append('file', Image);

		this.IsUploadDisabled = true;
		this.IsDisabled = true;
		this.HttpService.PostWithOptions(endPoint, formData, {
			reportProgress: true,
			observe: 'events'
		}).subscribe((res: any) => {
			if (res.type === HttpEventType.Response) {
				this.IsUploadDisabled = false;
				this.IsDisabled = false;
				let filePath = this.HttpService.ApiUrl + 'user/' + res.body.filePath.replaceAll('\\', '/');
				this.Account.ProfilePicturePath = filePath;
				this.editProfile();
			}
			if (res.type === HttpEventType.UploadProgress) {
				this.Progress.start = Math.round(100 * res.loaded / res.total);
			}
		})
	}

	removeProfilePicture() {
		this.Account.ProfilePicturePath = '';
		// console.log(this.Account.ProfilePicturePath)
		this.editProfile();
	}

	onSubmit(form: NgForm) {
		if (form.invalid) {
			this.Error = this.translate.instant("Error." + ErrorMessagesEnum.FILL_REQUIRED_FIELDS);
			return;
		}

		this.editProfile();
	}

	editProfile() {
		let newProfile = new UserModels.UserReqModel();
		newProfile.Id = this.Account.Id;
		newProfile.FirstName = this.Account.FirstName;
		newProfile.LastName = this.Account.LastName;
		newProfile.Birthdate = this.Account.Birthdate;
		newProfile.Email = this.Account.Email;
		newProfile.ProfilePicturePath = this.Account.ProfilePicturePath;


		let httpEndPoint = HttpEndPoints.Profile.EditProfile;
		this.HttpService.Put2<UserModels.UserReqModel, UserModels.User>(
			httpEndPoint,
			newProfile,
		).subscribe({
			next: (response) => {
				this.AuthService.CurrentUser = response;
				this.Account = response;
				this.NotifyService.Success(MessagesEnum.PROFILE_UPDATED_SUCCESS);
			},
			error: (errorResponse) => {
				const errMsg = errorResponse.error.Message;
				this.Error = this.translate.instant("Error." + errMsg);
			}
		});
	}
}
