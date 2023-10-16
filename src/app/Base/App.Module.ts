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
import { HeaderComponent } from './Components/Header/Header';
import { MenuComponent } from './Components/Menu/Menu';
import { FooterComponent } from './Components/Footer/Footer';
import { routes } from './App.Routes';

const blockUI_whitelist = [''];

@NgModule({
	declarations: [AppComponent, HeaderComponent, MenuComponent, FooterComponent],
	imports: [BrowserModule, RouterModule.forRoot(routes, { useHash: true }), HttpClientModule],
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
		{ provide: ErrorHandler, useClass: GlobalErrorHandler }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
