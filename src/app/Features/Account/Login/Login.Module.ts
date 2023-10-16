import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './Login';

const routes: Routes = [
	{
		path: '',
		component: LoginComponent
	}
];

@NgModule({
	imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
	declarations: [LoginComponent]
})
export class LoginModule {}
