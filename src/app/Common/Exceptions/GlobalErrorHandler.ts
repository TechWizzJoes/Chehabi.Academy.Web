import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { NotifyService } from '../Services/Notify.Service';
import { ErrorCodesEnum } from '../Enums/ErrorCodes.Enum';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	constructor(private ngZone: NgZone, private NotifyService: NotifyService) { }

	handleError(error: any): void {
		this.ngZone.run(() => {
			console.error(error);
			this.NotifyService.Error(ErrorCodesEnum.UNEXPECTED_ERROR_OCCURED);
		});
	}
}
