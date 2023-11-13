import { ErrorHandler, Inject, Injectable, NgZone } from '@angular/core';
import { NotifyService } from '../Services/Notify.Service';
import { ErrorCodesEnum } from '../Enums/ErrorCodes.Enum';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

	constructor(private ngZone: NgZone) { }

	handleError(error: any): void {
		this.ngZone.run(() => {

			console.error(error);
			// this.toastr.error(ErrorCodesEnum.UNEXPECTED_ERROR_OCCURED);
		});
	}
}
