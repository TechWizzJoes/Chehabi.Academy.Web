//https://ultimatecourses.com/blog/intro-to-angular-http-interceptors
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '@App/Common/Services/Auth.Service';

import { AppConfig } from '@App/Base/AppConfig';
import { NotifyService } from '../Services/Notify.Service';
import { JwtService } from '../Services/Jwt.Service';
import { RoutePaths } from '../Settings/RoutePaths';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	IsCurrentlyRefreshing: boolean = false;
	constructor(
		private router: Router,
		private AuthService: AuthService,
		private AppConfig: AppConfig,
		private NotifyService: NotifyService,
		private JwtService: JwtService
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let httpRequest = req;
		if (this.RequireRefresh(req)) {
			// console.log('token 60s for expiry');
			let refreshToken = this.AuthService.RefreshToken;
			if (!refreshToken) {
				this.router.navigate([RoutePaths.Login]);
				return EMPTY;
			}
			// this.IsCurrentlyRefreshing = true; //comment to avoid unauthorized after waiting till the access token expiration
			return this.AuthService.RefreshAccessToken().pipe(
				switchMap((data: any) => {
					// Retry the not sent request with the new access token
					const modifiedRequest = this.AddAccessToken(req, data.AccessToken);
					this.IsCurrentlyRefreshing = false;
					return next.handle(modifiedRequest);
				}),
				catchError((err) => {
					// If refresh token also fails, navigate to login
					this.router.navigateByUrl('login');
					this.IsCurrentlyRefreshing = false;
					return EMPTY;
				})
			);
		}

		// console.log('proceed adding token active');
		let accessToken = this.AuthService.AccessToken;
		httpRequest = this.AddAccessToken(req, accessToken);

		return next.handle(httpRequest).pipe(
			catchError((error, caught) => {
				//return the error to the method that called it
				return throwError(() => error);
			})
		) as any;
	}

	AddAccessToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
		if (typeof token === 'string') {
			const logToken = uuidv4();
			// headers always recieved in small letters
			return req.clone({ headers: req.headers.set('authorization', token).set('log-token', logToken) });
		}
		return req;
	}

	RequireRefresh(req: HttpRequest<any>): boolean {
		let accessToken = this.AuthService.AccessToken;
		// access token doesnot exist return to login page directly
		if (!accessToken) {
			this.router.navigate([RoutePaths.Login]);
			return false;
		}

		let isExpired = this.JwtService.IsTokenExpired(accessToken, 60);
		if (!isExpired) return false;
		// in case of requesting environment file
		if (req.url.includes('assets')) return false;
		// to avoid multiple refresh requests when the page have multiple requests at once
		if (this.IsCurrentlyRefreshing) return false;

		return true;
	}
}
