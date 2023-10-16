import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		//console.log("=========Request=========");
		//console.log(req.url);

		return next.handle(req).pipe(
			tap((evt) => {
				if (evt instanceof HttpResponse) {
					//console.log("=========Response=========");
					//console.log(req.url);
					//console.log('Http Status: ', evt.status);
					//console.log('---> filter:', req.params.get('filter'));
				}
			})
		);
	}
}
