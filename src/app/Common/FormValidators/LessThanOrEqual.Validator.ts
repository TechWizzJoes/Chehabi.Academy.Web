import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

const LESS_THAN_OR_EQUAL_VALIDATOR: any = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => LessThanOrEqualValidator),
	multi: true
};

@Directive({
	selector: '[lte]',
	providers: [LESS_THAN_OR_EQUAL_VALIDATOR]
})
export class LessThanOrEqualValidator implements Validator {
	@Input() lte!: string;

	validate(control: AbstractControl): ValidationErrors | null {
		return lte(this.lte)(control);
	}
}

export function lte(lte: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const inputValue: string = control.value;
		if (inputValue) {
			return inputValue.length <= parseInt(lte) ? null : { error: true };
		}
		return null;
	};
}
