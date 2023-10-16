import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const EQUAL_VALIDATOR: any = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => EqualValidator),
	multi: true
};

@Directive({
	selector: '[equal]',
	providers: [EQUAL_VALIDATOR]
})
export class EqualValidator implements Validator {
	@Input() equal: any;
	// @Input() reverse: any = false;

	validate(control: AbstractControl): ValidationErrors | null {
		return equal(this.equal)(control);
	}
}

export function equal(equal: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const inputValue: string = control.value;

		if (inputValue) {
			return equal === inputValue ? null : { error: true };
		}
		return null;
	};
}
