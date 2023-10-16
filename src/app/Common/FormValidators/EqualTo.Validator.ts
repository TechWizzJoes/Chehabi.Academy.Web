import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

const EQUAL_TO_VALIDATOR: any = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => EqualToValidator),
	multi: true
};

@Directive({
	selector: '[equalTo]',
	providers: [EQUAL_TO_VALIDATOR]
})
export class EqualToValidator implements Validator {
	@Input() equalTo!: any;

	validate(control: AbstractControl): ValidationErrors | null {
		return equalTo(this.equalTo)(control);
	}
}

export const equalTo = (equalControl: AbstractControl): ValidatorFn => {
	let subscribe = false;

	return (control: AbstractControl): ValidationErrors | null => {
		if (!subscribe) {
			subscribe = true;
			equalControl.valueChanges.subscribe(() => {
				control.updateValueAndValidity();
			});
		}

		const inputValue: any = control.value;

		return equalControl.value === inputValue ? null : { error: true };
	};
};
