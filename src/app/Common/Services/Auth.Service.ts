import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';

import { StorageService, StorageEnum } from './Storage.Service';
import { AuthModels } from '@App/Common/Models/Auth.Models';
import { AppConfig } from '@App/Base/AppConfig';
import { HttpService } from './Http.Service';
import { HttpEndPoints } from '../Settings/HttpEndPoints';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { RoutePaths } from '../Settings/RoutePaths';
import { WebSocketService } from './Websocket.Service';

@Injectable({ providedIn: 'root' })
export class AuthService {
	CurrentUserSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	ProfilePicUpdate: Subject<any> = new Subject();
	private isGoogleLoggedin!: boolean;
	private socialUser!: SocialUser;

	private WebSocketService!: WebSocketService;

	constructor(
		private StorageService: StorageService,
		private AppConfig: AppConfig,
		private HttpService: HttpService,
		private socialAuthService: SocialAuthService,
		private injector: Injector,
	) {
		this.AuthStateSubscribe();

	}

	SignIn(loginResModel: AuthModels.LoginResModel) {
		this.StorageService.SetLocalStorage(StorageEnum.AccessToken, loginResModel.AccessToken);
		this.StorageService.SetLocalStorage(StorageEnum.RefreshToken, loginResModel.RefreshToken);
		this.StorageService.SetLocalStorage(StorageEnum.CurrentUser, loginResModel.CurrentUser);

		if (!this.WebSocketService) {
			this.WebSocketService = this.injector.get(WebSocketService);
		}
		this.WebSocketService.connect();
	}

	SignOut() {
		this.StorageService.RemoveLocalStorage(StorageEnum.AccessToken);
		this.StorageService.RemoveLocalStorage(StorageEnum.RefreshToken);
		this.StorageService.RemoveLocalStorage(StorageEnum.CurrentUser);

		if (this.isGoogleLoggedin)
			this.socialAuthService.signOut();

		if (!this.WebSocketService) {
			this.WebSocketService = this.injector.get(WebSocketService);
		}
		this.WebSocketService.disconnect();

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

	get ProfilePicture(): string | undefined {
		return this.CurrentUser.ProfilePicturePath;
	}

	set ProfilePicture(value) {
		let user = this.StorageService.GetLocalStorage<AuthModels.CurrentUserResModel>(StorageEnum.CurrentUser)
		user.ProfilePicturePath = value;

		this.StorageService.SetLocalStorage(StorageEnum.CurrentUser, user);
	}

	get CurrentUser(): AuthModels.CurrentUserResModel {
		return this.StorageService.GetLocalStorage<AuthModels.CurrentUserResModel>(StorageEnum.CurrentUser);
	}

	get IsAuthenticated(): boolean {
		return Object.keys(this.CurrentUser).length != 0 ? true : false;
	}

	RefreshAccessToken(): any {
		let requestModel: AuthModels.RefreshTokenReqModel = {
			Id: this.CurrentUser.Id,
			AccessToken: this.AccessToken,
			RefreshToken: this.RefreshToken
		};

		if (!requestModel.AccessToken || !requestModel.RefreshToken) return

		let httpEndPoint = HttpEndPoints.Account.Refresh;
		return this.HttpService.Post<AuthModels.RefreshTokenReqModel, AuthModels.RefreshTokenResModel>(
			httpEndPoint,
			requestModel,
		).pipe(
			tap((data) => {
				console.log('access token refreshed');

				this.SignIn(data)
			})
		);
	}

	AuthStateSubscribe(): void {
		this.socialAuthService.authState.subscribe((user) => {
			console.log('auth state sub', user);
			this.socialUser = user;
			this.isGoogleLoggedin = user != null;
			if (user)
				this.SocialLogin.Google.Login(this.socialUser.idToken)
		});
	}

	GetRoleDefaultRoute(): String {
		const isAdmin = this.CurrentUser.IsAdmin;
		return isAdmin ? RoutePaths.DefaultAdmin : RoutePaths.Default;
	}

	SocialLogin = {
		Google: {
			Login: (idToken: string) => {
				let requestModel = {
					IdToken: idToken,
				} as AuthModels.GoogleLoginReqModel;

				let httpEndPoint = HttpEndPoints.Account.SocialLogin.Google;
				this.HttpService.Post<AuthModels.GoogleLoginReqModel, AuthModels.LoginResModel>(
					httpEndPoint,
					requestModel,
				).subscribe({
					next: (response) => {
						console.log(response);
						this.SignIn(response);
						this.CurrentUserSub.next(true)
					}
				});
			}
		}
	}
}
