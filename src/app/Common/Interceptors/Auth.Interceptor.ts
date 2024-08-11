//https://ultimatecourses.com/blog/intro-to-angular-http-interceptors
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '@App/Common/Services/Auth.Service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	IsCurrentlyRefreshing: boolean = false;
	constructor(
		private router: Router,
		private AuthService: AuthService,
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let accessToken = this.AuthService.AccessToken;
		let httpRequest = req;
		httpRequest = this.AddAccessToken(req, accessToken);

		return next.handle(httpRequest).pipe(
			catchError((error, caught) => {
				if (error.status == 401) {
					return this.AuthService.RefreshAccessToken().pipe(
						switchMap((data: any) => {
							const modifiedRequest = this.AddAccessToken(httpRequest, data.AccessToken);
							return next.handle(modifiedRequest);
						}),
						catchError((err) => {
							this.router.navigateByUrl('login');
							return EMPTY;
						})
					);
				}
				return throwError(() => error);
			})
		) as any;
	}

	AddAccessToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
		if (token && typeof token === 'string') {
			// const logToken = uuidv4();
			// headers always recieved in small letters
			return req.clone({ headers: req.headers.set('authorization', token) });
		}
		return req;
	}
}
