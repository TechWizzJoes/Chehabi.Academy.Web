import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthModels } from '@App/Common/Models/Auth.Models';
import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { RouterModule } from '@angular/router';
import { routes } from '../../Base/App.Routes';
import { PipesModule } from "../../Common/Pipes/Pipes.Module";
import { LanguageService } from '@App/Common/Services/Language.Service';





@Component({
	standalone: true,
	templateUrl: './About.html',
	styleUrls: ['About.scss'],
	imports: [FormsModule, CommonModule, TranslateModule, RouterModule, PipesModule]
})
export class AboutComponent implements OnInit {
	CurrentUser!: AuthModels.CurrentUserResModel
	RoutePaths = RoutePaths
	VideoUrl!: string;

	constructor(
		protected router: Router,
		private route: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		protected AuthService: AuthService,
		private StorageService: StorageService,
		private LanguageService: LanguageService,
		private translate: TranslateService
	) { }

	ngOnInit() {
		this.CurrentUser = this.AuthService.CurrentUser
		this.AuthService.CurrentUserSub.subscribe(isExisting => {
			if (isExisting) {
				this.CurrentUser = this.AuthService.CurrentUser;
			}
		});
	}
}
