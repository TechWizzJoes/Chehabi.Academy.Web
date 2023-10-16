import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

const MIN_VALIDATOR: any = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => MinValidator),
	multi: true
};

@Directive({
	selector: '[min]',
	providers: [MIN_VALIDATOR]
})
export class MinValidator implements Validator {
	@Input() min!: string;

	validate(control: AbstractControl): ValidationErrors | null {
		return min(this.min)(control);
	}
}

export function min(min: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const inputValue: string = control.value;
		if (inputValue) {
			return inputValue.length >= parseInt(min) ? null : { error: true };
		}
		return null;
	};
}
