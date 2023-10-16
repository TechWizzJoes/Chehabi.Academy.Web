import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

const MAX_VALIDATOR: any = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => MaxValidator),
	multi: true
};

@Directive({
	selector: '[max]',
	providers: [MAX_VALIDATOR]
})
export class MaxValidator implements Validator {
	@Input() max!: string;

	validate(control: AbstractControl): ValidationErrors | null {
		return max(this.max)(control);
	}
}

export function max(max: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const inputValue: string = control.value;
		if (inputValue) {
			return inputValue.length <= parseInt(max) ? null : { error: true };
		}
		return null;
	};
}
