import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ForgetPasswordComponent } from './ForgetPassword';

const routes: Routes = [
	{
		path: '',
		component: ForgetPasswordComponent
	}
];

@NgModule({
	imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
	declarations: [ForgetPasswordComponent]
})
export class ForgetPasswordModule {}
