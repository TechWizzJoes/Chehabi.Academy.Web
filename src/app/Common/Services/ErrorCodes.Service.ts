import { Injectable } from '@angular/core';
// import { ErrorCodesEnum } from '@App/Common/Enums/ErrorCodes.Enum';

@Injectable({ providedIn: 'root' })
export class ErrorCodesService {
	constructor() { }

	//not used now as we use translate and we deleted ErrorCodesEnum
	GetErrorCode(errorCode: string) {
		// const errorCodesEnum = ErrorCodesEnum[errorCode as keyof typeof ErrorCodesEnum];
		// return errorCodesEnum ?? errorCode;
		return errorCode;
	}
}
