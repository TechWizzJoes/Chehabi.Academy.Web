import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';

import { AppConfig } from './AppConfig';
import { AppComponent } from './AppComponent';

import { AuthInterceptor } from '@App/Common/Interceptors/Auth.Interceptor';
import { LogInterceptor } from '@App/Common/Interceptors/Log.Interceptor';
import { ErrorInterceptor } from '@App/Common/Interceptors/Error.Interceptor';
import { GlobalErrorHandler } from '@App/Common/Exceptions/GlobalErrorHandler';
import { RetryInterceptor } from '@App/Common/Interceptors/Retry.Interceptor';
import { routes } from './App.Routes';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, RouterModule.forRoot(routes, { useHash: true }), HttpClientModule, SocialLoginModule],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: (appConfig: AppConfig) => () => appConfig.LoadAppConfig(),
			multi: true,
			deps: [AppConfig]
		},
		AppConfig,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		//{ provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true },
		{ provide: ErrorHandler, useClass: GlobalErrorHandler },
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: true,
				providers: [
					{
						id: GoogleLoginProvider.PROVIDER_ID,
						provider: new GoogleLoginProvider(
							'983824447249-2pjqpa8scedeumrbmhqqjacgg6o1673u.apps.googleusercontent.com'
						)
					}
				],
				onError: (err: any) => {
					console.error(err);
				}
			} as SocialAuthServiceConfig
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
