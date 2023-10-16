import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

// import { BlockUI, NgBlockUI } from 'ng-block-ui';

export interface CanComponentDeactivate {
	CanDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class DeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
	// @BlockUI() BlockUI!: NgBlockUI;

	canDeactivate(canComponentDeactivate: CanComponentDeactivate) {
		// this.BlockUI.stop();
		return canComponentDeactivate.CanDeactivate ? canComponentDeactivate.CanDeactivate() : true;
	}
}
