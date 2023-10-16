import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

const LESS_THAN_VALIDATOR: any = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => LessThanValidator),
	multi: true
};

@Directive({
	selector: '[lt]',
	providers: [LESS_THAN_VALIDATOR]
})
export class LessThanValidator implements Validator {
	@Input() lt!: string;

	validate(control: AbstractControl): ValidationErrors | null {
		return lt(this.lt)(control);
	}
}

export function lt(lt: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const inputValue: string = control.value;
		if (inputValue) {
			return inputValue.length <= parseInt(lt) ? null : { error: true };
		}
		return null;
	};
}
