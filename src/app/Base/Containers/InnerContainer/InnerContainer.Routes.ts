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
				loadComponent: () => import('@App/Features/CoursesList/CoursePage/CoursePage').then((c) => c.CoursePageComponent)
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
				canActivate: [AuthGuard],
				path: 'dashboard',
				loadComponent: () => import('@App/Features/Dashboard/Dashboard').then((c) => c.DashboardComponent),
				children: [
					{
						path: 'courses',
						loadComponent: () => import('@App/Features/Dashboard/Courses/Courses').then((c) => c.CoursesComponent),
						pathMatch: 'full'
					},
					{
						path: 'courses/:id',
						loadComponent: () => import('@App/Features/Dashboard/CourseDetails/CourseDetails').then((c) => c.CourseDetailsComponent),
						pathMatch: 'full'
					},
					{
						path: 'courses/:cid/class/:id',
						loadComponent: () => import('@App/Features/Dashboard/ClassDetails/ClassDetails').then((c) => c.ClassDetailsComponent)
					}
				]
			},
			{
				canActivate: [AuthGuard],
				path: 'profile',
				loadComponent: () => import('@App/Features/Profile/Profile').then((c) => c.ProfileComponent),
				children: [
					{
						path: 'edit',
						loadComponent: () => import('@App/Features/Profile/EditProfile/EditProfile').then((c) => c.EditProfileComponent)
					},
					{
						path: 'password',
						loadComponent: () => import('@App/Features/Password/Password').then((c) => c.PasswordComponent)
					}
				]
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
