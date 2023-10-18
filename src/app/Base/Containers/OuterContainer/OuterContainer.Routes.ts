import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OuterContainer } from './OuterContainer';

export const routes: Routes = [
	{
		path: '',
		component: OuterContainer,
		children: [
			{
				path: 'forget-password',
				loadComponent: () =>
					import('@App/Features/Account/ForgetPassword/ForgetPassword').then((m) => m.ForgetPasswordComponent)
			},
			{
				path: 'login',
				loadComponent: () => import('@App/Features/Account/Login/Login').then((m) => m.LoginComponent)
			}, {
				path: 'register',
				loadComponent: () => import('@App/Features/Account/Register/Register').then((m) => m.RegisterComponent)
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class OuterContainerRoutes { }
