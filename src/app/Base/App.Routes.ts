import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from '@App/Common/Guards/Auth.Guard';
// import { RoleGuard } from '@App/Common/Guards/Role.Guard';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { AppComponent } from './AppComponent';

export const routes: Routes = [
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
	{
		path: 'home',
		loadComponent: () => import('@App/Features/Home/Home').then((c) => c.HomeComponent)
	},
	{
		path: 'unauthorized',
		loadComponent: () =>
			import('@App/Base/Components/UnAuthorized/UnAuthorized').then((c) => c.UnAuthorizedComponent)
	},
	{ path: '', redirectTo: 'RoutePaths.Home', pathMatch: 'full' },
	{
		path: '**',
		redirectTo: RoutePaths.Default
	}
];
