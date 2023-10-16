import { NgModule } from '@angular/core';
import { email, EmailValidator } from './Email.Validator';
import { max, MaxValidator } from './Max.Validator';
import { min, MinValidator } from './Min.Validator';
import { number, NumberValidator } from './Number.Validator';
import { url, UrlValidator } from './Url.Validator';
import { equal, EqualValidator } from './Equal.Validator';
import { gt, GreaterThanValidator } from './GreaterThan.Validator';
import { lt, LessThanValidator } from './LessThan.Validator';
import { gte, GreaterThanOrEqualValidator } from './GreaterThanOrEqual.Validator';
import { lte, LessThanOrEqualValidator } from './LessThanOrEqual.Validator';
import { equalTo, EqualToValidator } from './EqualTo.Validator';

export const FormValidatorsContants = {
	email,
	max,
	min,
	number,
	url,
	equal,
	gte,
	gt,
	lte,
	lt,
	equalTo
};

const FormValidators = [
	EmailValidator,
	MaxValidator,
	MinValidator,
	NumberValidator,
	UrlValidator,
	EqualValidator,
	GreaterThanValidator,
	LessThanValidator,
	GreaterThanOrEqualValidator,
	LessThanOrEqualValidator,
	EqualToValidator
];
@NgModule({
	declarations: [FormValidators],
	exports: [FormValidators]
})
export class FormValidatorsModule {}
