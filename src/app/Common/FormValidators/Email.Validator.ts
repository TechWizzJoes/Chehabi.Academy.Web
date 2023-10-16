import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const EMAIL_VALIDATOR: any = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => EmailValidator),
	multi: true
};

@Directive({
	selector: '[email]',
	providers: [EMAIL_VALIDATOR]
})
export class EmailValidator implements Validator {
	validate(control: AbstractControl): ValidationErrors | null {
		return email(control);
	}
}

export const email: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	const emailValue: string = control.value;
	if (emailValue) {
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			emailValue
		)
			? null
			: { error: true };
	}
	return null;
};
