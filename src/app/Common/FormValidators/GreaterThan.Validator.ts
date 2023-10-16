import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

const GREATER_THAN_VALIDATOR: any = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => GreaterThanValidator),
	multi: true
};

@Directive({
	selector: '[gt]',
	providers: [GREATER_THAN_VALIDATOR]
})
export class GreaterThanValidator implements Validator {
	@Input() gt!: string;

	validate(control: AbstractControl): ValidationErrors | null {
		return gt(this.gt)(control);
	}
}

export function gt(gt: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const inputValue: string = control.value;
		if (inputValue) {
			return inputValue.length > parseInt(gt) ? null : { error: true };
		}
		return null;
	};
}
