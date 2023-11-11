import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, Observable, timer, EMPTY } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { AppConfig } from '@App/Base/AppConfig';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			retry({
				count: 0,
				delay: (error: HttpErrorResponse, count: number) => this.ShouldRetry(error, count) //anonymous fn to use (this) in shouldretry navigate
			})
		);
	}

	private ShouldRetry(error: HttpErrorResponse, count: number) {
		// return errors if dont want to retry

		let errCode = error.status;
		// // if unauthorized
		// if (errCode == 401) {
		// 	return throwError(() => error);
		// }
		// // if internal server error
		// if (errCode.toString().charAt(0) === '5') {
		// 	return throwError(() => error);
		// }
		// // if login request
		// if (error.url?.includes('Login')) {
		// 	return throwError(() => error);
		// }

		// handle no internet or server is down
		if (errCode === 0 && error.error instanceof ProgressEvent) {
			// but not working if stopped network from browser
			return timer(0);
		}

		// increase the delay for each trial by 1 sec
		// return timer(count * 1000);
		return throwError(() => error);
	}
}
