import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from '@App/Common/Guards/Auth.Guard';
// import { RoleGuard } from '@App/Common/Guards/Role.Guard';
import { InnerContainer } from './InnerContainer';
import { RolesGuard } from '@App/Common/Guards/Roles.Guard';
import { AuthGuard } from '@App/Common/Guards/Auth.Guard';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';

export const routes: Routes = [
	{
		path: '',
		component: InnerContainer,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'home',
				loadComponent: () => import('@App/Features/Home/Home').then((c) => c.HomeComponent)
			},
			{
				path: 'about',
				loadComponent: () => import('@App/Features/About/About').then((c) => c.AboutComponent)
			},
			{
				path: 'courses',
				loadComponent: () => import('@App/Features/Courses/Courses').then((c) => c.CoursesComponent)
			},
			{
				path: 'feedback',
				loadComponent: () => import('@App/Features/Feedback/Feedback').then((c) => c.FeedbackComponent)
			},
			{
				path: 'contactus',
				loadComponent: () => import('@App/Features/ContactUs/ContactUs').then((c) => c.ContactUsComponent)
			},
			{
				path: 'founder',
				loadComponent: () => import('@App/Features/Founder/Founder').then((c) => c.FounderComponent)
			},
			{
				path: 'unauthorized',
				loadComponent: () =>
					import('@App/Base/Containers/InnerContainer/Components/UnAuthorized/UnAuthorized').then((c) => c.UnAuthorizedComponent)
			},
			// { path: '', redirectTo: 'RoutePaths.Home', pathMatch: 'full' },
			{
				path: '**',
				redirectTo: RoutePaths.Default
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class InnerContainerRoutes { }
