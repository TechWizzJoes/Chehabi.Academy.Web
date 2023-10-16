import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

const NUMBER_VALIDATOR: any = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => NumberValidator),
	multi: true
};

@Directive({
	selector: '[number]',
	providers: [NUMBER_VALIDATOR]
})
export class NumberValidator implements Validator {
	validate(control: AbstractControl): ValidationErrors | null {
		return number(control);
	}
}

export const number = (control: AbstractControl): ValidationErrors | null => {
	const inputValue: string = control.value;
	if (inputValue) {
		return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(inputValue) ? null : { error: true };
	}
	return null;
};
