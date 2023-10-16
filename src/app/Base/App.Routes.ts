import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from '@App/Common/Guards/Auth.Guard';
// import { RoleGuard } from '@App/Common/Guards/Role.Guard';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { AppComponent } from './AppComponent';

export const routes: Routes = [
	{
		path: 'forget-password',
		loadChildren: () =>
			import('@App/Features/Account/ForgetPassword/ForgetPassword.Module').then((m) => m.ForgetPasswordModule)
	},
	{
		path: 'login',
		loadChildren: () => import('@App/Features/Account/Login/Login.Module').then((m) => m.LoginModule)
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
