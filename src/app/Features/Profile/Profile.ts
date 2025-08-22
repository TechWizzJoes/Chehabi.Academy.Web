import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { TranslateModule } from '@ngx-translate/core';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { AuthModels } from '@App/Common/Models/Auth.Models';

@Component({
	standalone: true,
	templateUrl: './Profile.html',
	styleUrls: ['Profile.scss'],
	imports: [FormsModule, CommonModule, RouterModule, TranslateModule]
})
export class ProfileComponent {
	RoutePaths = RoutePaths;
	IsLoaded: boolean = false;
	Account: UserModels.User = new UserModels.User();
	IsDisabled: boolean = false;
	IsUploadDisabled: boolean = false;
	Error!: string;
	Progress: any = { start: 0, end: 100 }
	currentUser!: AuthModels.CurrentUserResModel;

	constructor(
		private Router: Router,
		private ActivatedRoute: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		private AuthService: AuthService,
		private StorageService: StorageService
	) {
		this.currentUser = this.AuthService.CurrentUser;
	}
}
