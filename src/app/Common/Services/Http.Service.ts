import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';
import { StorageService } from './Storage.Service';
import { AppConfig } from '@App/Base/AppConfig';
import { AuthModels } from '../Models/Auth.Models';

@Injectable({ providedIn: 'root' })
export class HttpService {
	ApiUrl: string = '';

	DefaultMaxTries: number = 3;

	constructor(private HttpClient: HttpClient, private StorageService: StorageService, private AppConfig: AppConfig) {
		this.SetApiUrl()
	}

	SetApiUrl() {
		this.AppConfig.ApiUrl.subscribe((url) => {
			(this.ApiUrl = url)
		});
	}

	Get<T>(endPoint: string) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.get<T>(endPointUrl).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	Post<Req, Res>(endPoint: string, model: Req,) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.post<Res>(endPointUrl, model).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	Put<Req>(endPoint: string, model: Req) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.put(endPointUrl, model).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	Put2<Req, Res>(endPoint: string, model: Req) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.put<Res>(endPointUrl, model).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	Delete(endPoint: string) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.delete(endPointUrl).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	GetWithOptions<T>(endPoint: string, options: any) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.get<T>(endPointUrl, options).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	GetWithParams<T>(endPoint: string, params: any) {
		const endPointUrl = this.ApiUrl + endPoint;
		let options = {
			params: params
		};
		return this.HttpClient.get<T>(endPointUrl, options).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	PostWithOptions<Req, Res>(endPoint: string, model: Req, options: any) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.post<Res>(endPointUrl, model, options).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	PutWithRes<Req, Res>(endPoint: string, model: Req) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.put<Res>(endPointUrl, model).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	Patch(endPoint: string, model: any) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.patch(endPointUrl, model).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}
	PatchWithRes<Res>(endPoint: string, model: any) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.patch<Res>(endPointUrl, model).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}
}
