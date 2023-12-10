import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, Observable, timer, EMPTY } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { AppConfig } from '@App/Base/AppConfig';
import { ErrorMessagesEnum } from '../Enums/ErrorMessages.Enum';
import { ErrorCodesEnum } from '../Enums/ErrorCodes.Enum';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	@BlockUI() BlockUI!: NgBlockUI;

	constructor(
		private router: Router,
		private NotifyService: NotifyService,
		private ErrorCodesService: ErrorCodesService,
		private AppConfig: AppConfig
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error, caught) => {
				console.log('error interceptor');
				// after all retrys if any
				// return login error to handle in the component
				if (req.url.includes('account')) {
					return throwError(() => error);
				}

				// handle no internet or server is down
				if (error.status == 0 && error.error instanceof ProgressEvent) {
					// but not working if stopped network from browser
					this.NotifyService.Error(ErrorMessagesEnum.NETWORK_ERROR);
					return EMPTY;
				}

				// retun whitelisted errors to handle in components
				if (this.IsWhiteList(error.error.message)) {
					return throwError(() => error);
				}

				// handle http known errors except listing for now to show the notfound component
				if (error instanceof HttpErrorResponse && error.status == 401) {
					return throwError(() => error);
				}

				// handle http known errors except listing for now to show the notfound component
				if (error instanceof HttpErrorResponse) {
					// Handle HTTP errors
					const errMsg = error.error.Message;
					const customMsg = this.ErrorCodesService.GetErrorCode(errMsg)
					if (customMsg)
						this.NotifyService.Error(customMsg);
					return EMPTY;
				}
				return EMPTY
			})
		) as any;
	}

	IsWhiteList(errMsg: string): boolean {
		return false;
	}
}
