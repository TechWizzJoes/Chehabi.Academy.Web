import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, tap, throwError } from 'rxjs';

import { StorageService, StorageEnum } from './Storage.Service';
import { AuthModels } from '@App/Common/Models/Auth.Models';
import { AppConfig } from '@App/Base/AppConfig';
import { HttpService } from './Http.Service';
import { HttpEndPoints } from '../Settings/HttpEndPoints';

@Injectable({ providedIn: 'root' })
export class AuthService {
	CurrentUserSub!: Subscription;
	isGoogleLoggedin!: boolean;

	constructor(
		private StorageService: StorageService,
		private AppConfig: AppConfig,
		private HttpService: HttpService
	) { }

	SignIn(loginResModel: AuthModels.LoginResModel) {
		this.StorageService.SetLocalStorage(StorageEnum.AccessToken, loginResModel.AccessToken);
		this.StorageService.SetLocalStorage(StorageEnum.RefreshToken, loginResModel.RefreshToken);
		this.StorageService.SetLocalStorage(StorageEnum.CurrentUser, loginResModel.CurrentUser);
	}

	SignOut() {
		this.StorageService.RemoveLocalStorage(StorageEnum.AccessToken);
		this.StorageService.RemoveLocalStorage(StorageEnum.RefreshToken);
		this.StorageService.RemoveLocalStorage(StorageEnum.CurrentUser);
	}

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

	RefreshAccessToken(): any {
		let requestModel = {
			Id: this.CurrentUser.Id,
			AccessToken: this.AccessToken, // send it and check in backend if valid
			RefreshToken: this.RefreshToken
		} as AuthModels.RefreshTokenReqModel;

		let httpEndPoint = HttpEndPoints.Account.Refresh;
		return this.HttpService.Post<AuthModels.RefreshTokenReqModel, AuthModels.RefreshTokenResModel>(
			httpEndPoint,
			requestModel,
		).pipe(
			tap((data) => {
				this.AccessToken = data.AccessToken;
				this.RefreshToken = data.RefreshToken;
			})
		);
	}
}
