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
import { UserModels } from '@App/Common/Models/User.Models';
import { AuthModels } from '@App/Common/Models/Auth.Models';
import { MessagesEnum } from '@App/Common/Enums/Messages.Enum';
import { ErrorMessagesEnum } from '@App/Common/Enums/ErrorMessages.Enum';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	standalone: true,
	templateUrl: './EditNotifications.html',
	styleUrls: ['EditNotifications.scss'],
	imports: [FormsModule, CommonModule, TranslateModule]
})
export class EditNotificationsComponent implements OnInit {
	IsLoaded: boolean = false;
	User!: UserModels.User;

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
		this.HttpService.Get<UserModels.User>(endPoint).subscribe(data => {
			this.IsLoaded = true
			this.User = data;
		})
	}


	onSubmit(form: NgForm) {
		let httpEndPoint = HttpEndPoints.Profile.EditPreference;
		this.HttpService.Put2<UserModels.UserPrefrence, UserModels.User>(
			httpEndPoint,
			this.User.UserPrefrence
		).subscribe({
			next: (response) => {
				this.NotifyService.Success(MessagesEnum.PEREFRENCES_UPDATED_SUCCESS);
			},
			error: (errorResponse) => {
				// to show the error on login panel
				// this.Error = ErrorMessagesEnum.WRONG_PASSWORD_RESET;
			}
		});
	}
}
