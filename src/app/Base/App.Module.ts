import { APP_INITIALIZER, ErrorHandler, NgModule, isDevMode } from '@angular/core';
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

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as animations from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PreLoaderComponent } from '@App/Common/Widgets/Spinners/PreLoader/PreLoader';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes, { useHash: false }),
		HttpClientModule,
		SocialLoginModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		BrowserAnimationsModule, // required animations module
		ToastrModule.forRoot({
			preventDuplicates: true,
			countDuplicates: true
		}),
		ServiceWorkerModule.register('ngsw-worker.js', {
			// enabled: false,
			enabled: !isDevMode(),
			registrationStrategy: 'registerWhenStable:30000'
		}),
		PreLoaderComponent
	],
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
						provider: new GoogleLoginProvider('983824447249-2pjqpa8scedeumrbmhqqjacgg6o1673u.apps.googleusercontent.com', { oneTapEnabled: false }),
					},
				],
			} as SocialAuthServiceConfig,
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http);
}