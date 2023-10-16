import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';
import { StorageEnum, StorageService } from './Storage.Service';
import { AuthModels } from '../Models/Auth.Models';
import { AppConfig } from '@App/Base/AppConfig';
import { ApiEnum } from '../Settings/HttpEndPoints';

@Injectable({ providedIn: 'root' })
export class HttpService {
	ApiUrl: string = '';
	AccountApiUrl: string = '';
	PbxApiUrl: string = '';

	DefaultMaxTries: number = 3;

	constructor(private HttpClient: HttpClient, private StorageService: StorageService, private AppConfig: AppConfig) {}

	GetHostApi(apiEnum: ApiEnum): string {
		return apiEnum;
	}

	// Get<T>(endPoint: string, options: any = null) {
	// 	let endPointUrl = this.ApiUrlCore + endPoint;
	// 	if (options) {
	// 		return this.HttpClient.get<T>(endPointUrl, options);
	// 	} else {
	// 		return this.HttpClient.get<T>(endPointUrl);
	// 	}
	// }

	Get<T>(endPoint: string, apiEnum: ApiEnum = ApiEnum.Api) {
		const hostApi = this.GetHostApi(apiEnum);
		const endPointUrl = hostApi + endPoint;
		return this.HttpClient.get<T>(endPointUrl).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	Post<Req, Res>(
		endPoint: string,
		model: Req,
		apiEnum: ApiEnum = ApiEnum.Api,
		retryCount: number = this.DefaultMaxTries
	) {
		const hostApi = this.GetHostApi(apiEnum);
		const endPointUrl = hostApi + endPoint;
		return this.HttpClient.post<Res>(endPointUrl, model).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	Put<Req>(endPoint: string, model: Req, apiEnum: ApiEnum = ApiEnum.Api) {
		const hostApi = this.GetHostApi(apiEnum);
		const endPointUrl = hostApi + endPoint;
		return this.HttpClient.put(endPointUrl, model).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	Put2<Req, Res>(endPoint: string, model: Req, apiEnum: ApiEnum = ApiEnum.Api) {
		const hostApi = this.GetHostApi(apiEnum);
		const endPointUrl = hostApi + endPoint;
		return this.HttpClient.put<Res>(endPointUrl, model).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	Delete(endPoint: string, apiEnum: ApiEnum = ApiEnum.Api) {
		const hostApi = this.GetHostApi(apiEnum);
		const endPointUrl = hostApi + endPoint;
		return this.HttpClient.delete(endPointUrl).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	GetWithOptions<T>(endPoint: string, options: any, apiEnum: ApiEnum = ApiEnum.Api) {
		const hostApi = this.GetHostApi(apiEnum);
		const endPointUrl = hostApi + endPoint;
		return this.HttpClient.get<T>(endPointUrl, options).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	GetWithParams<T>(apiEnum: ApiEnum, endPoint: string, params: any) {
		// 	let options = {
		// 		responseType: 'blob' as 'json',
		// 		params: {
		// 			fileName: fileName,
		// 		}
		// 	};
		const hostApi = this.GetHostApi(apiEnum);
		const endPointUrl = hostApi + endPoint;
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

	PostWithOptions<Req, Res>(endPoint: string, model: Req, options: any, apiEnum: ApiEnum = ApiEnum.Api) {
		const hostApi = this.GetHostApi(apiEnum);
		const endPointUrl = hostApi + endPoint;
		return this.HttpClient.post<Res>(endPointUrl, model, options).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	PutWithRes<Req, Res>(apiEnum: ApiEnum, endPoint: string, model: Req) {
		const hostApi = this.GetHostApi(apiEnum);
		const endPointUrl = hostApi + endPoint;
		return this.HttpClient.put<Res>(endPointUrl, model).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	Patch(apiEnum: ApiEnum, endPoint: string, model: any) {
		const hostApi = this.GetHostApi(apiEnum);
		const endPointUrl = hostApi + endPoint;
		return this.HttpClient.patch(endPointUrl, model).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}
	PatchWithRes<Res>(apiEnum: ApiEnum, endPoint: string, model: any) {
		const hostApi = this.GetHostApi(apiEnum);
		const endPointUrl = hostApi + endPoint;
		return this.HttpClient.patch<Res>(endPointUrl, model).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	// post(endpoint: string, body: any, reqOpts?: any) {
	//     return this.HttpClient.post(endpoint, body, reqOpts);
	// }

	// Put<Req, Res>(endPoint: string, model: Req, apiEnum?: ApiEnum) {

	// 	let endPointUrl = this.ApiUrlCore + endPoint;
	// 	return this.HttpClient.put<Res>(endPointUrl, model);
	// }

	// Get<T>(endPoint: string, reqOpts?: any) {
	// 	let endPointUrl = this.ApiUrlCore + endPoint;
	// 	return this.HttpClient.get<T>(endPointUrl, reqOpts);
	// }
}
