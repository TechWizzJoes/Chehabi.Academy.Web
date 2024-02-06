import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from '@App/Common/Guards/Auth.Guard';
// import { RoleGuard } from '@App/Common/Guards/Role.Guard';
import { InnerContainer } from './InnerContainer';
import { RolesGuard } from '@App/Common/Guards/Roles.Guard';
import { AuthGuard } from '@App/Common/Guards/Auth.Guard';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { path } from 'd3';

export const routes: Routes = [
	{
		path: '',
		component: InnerContainer,
		// canActivate: [AuthGuard],
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
				loadComponent: () => import('@App/Features/CoursesList/CoursesList').then((c) => c.CoursesListComponent)
			},
			{
				path: 'course/:id',
				loadComponent: () => import('@App/Features/CoursesList/Course/Course').then((c) => c.CourseComponent)
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
				canActivate: [],
				path: 'profile',
				loadComponent: () => import('@App/Features/Profile/Profile').then((c) => c.ProfileComponent)
			},
			{
				canActivate: [],
				path: 'dashboard',
				loadComponent: () => import('@App/Features/Dashboard/Dashboard').then((c) => c.DashboardComponent),
				// children: [
				// 	{
				// 		path: 'course/:id',
				// 		loadComponent: () => import('@App/Features/Dashboard/CourseDetails/CourseDetails').then((c) => c.CourseDetailsComponent)
				// 	}
				// ]
			},
			{
				canActivate: [],
				path: 'dashboard/course/:id',
				loadComponent: () => import('@App/Features/Dashboard/CourseDetails/CourseDetails').then((c) => c.CourseDetailsComponent)
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
