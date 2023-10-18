import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, tap, throwError } from 'rxjs';

import { StorageService, StorageEnum } from './Storage.Service';
import { AuthModels } from '@App/Common/Models/Auth.Models';
import { AppConfig } from '@App/Base/AppConfig';
import { HttpService } from './Http.Service';

@Injectable({ providedIn: 'root' })
export class AuthService {
	CurrentUserSub!: Subscription;

	UserMenu = [
		{
			Id: 1,
			ParentId: 0
		}
	];

	constructor(
		private StorageService: StorageService,
		private AppConfig: AppConfig,
		private HttpService: HttpService
	) { }

	SignIn(loginResModel: AuthModels.LoginResModel) { }

	SignOut() { }

	get AccessToken(): string {
		let token = this.StorageService.GetLocalStorage<string>(StorageEnum.AccessToken);
		if (Object.keys(token).length == 0) return '';
		return token;
	}

	set AccessToken(value) {
		this.StorageService.SetLocalStorage(StorageEnum.AccessToken, value);
	}

	get RefreshToken(): string {
		let token = this.StorageService.GetLocalStorage<string>(StorageEnum.RefreshToken);
		if (Object.keys(token).length == 0) return '';
		return token;
	}

	set RefreshToken(value) {
		this.StorageService.SetLocalStorage(StorageEnum.RefreshToken, value);
	}

	get UserDiDs(): string[] {
		return this.StorageService.GetLocalStorage<string[]>(StorageEnum.UserDIDs);
	}

	set UserDiDs(value) {
		this.StorageService.SetLocalStorage(StorageEnum.UserDIDs, value);
	}

	get CurrentUser(): AuthModels.CurrentUserResModel {
		return this.StorageService.GetLocalStorage<AuthModels.CurrentUserResModel>(StorageEnum.CurrentUser);
	}

	get IsAuthenticated(): boolean {
		return Object.keys(this.CurrentUser).length != 0 ? true : false;
	}

	GetUserDIDs() { }

	RefreshAccessToken(): any { }
}
