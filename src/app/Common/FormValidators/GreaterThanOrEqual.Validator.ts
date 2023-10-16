import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

const GREATER_THAN_OR_EQUAL_VALIDATOR: any = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => GreaterThanOrEqualValidator),
	multi: true
};

@Directive({
	selector: '[gte]',
	providers: [GREATER_THAN_OR_EQUAL_VALIDATOR]
})
export class GreaterThanOrEqualValidator implements Validator {
	@Input() gte!: string;

	validate(control: AbstractControl): ValidationErrors | null {
		return gte(this.gte)(control);
	}
}

export function gte(gte: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const inputValue: string = control.value;
		if (inputValue) {
			return inputValue.length >= parseInt(gte) ? null : { error: true };
		}
		return null;
	};
}
