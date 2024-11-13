import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from '@App/Common/Guards/Auth.Guard';
// import { RoleGuard } from '@App/Common/Guards/Role.Guard';
import { InnerContainer } from './InnerContainer';
import { RolesGuard } from '@App/Common/Guards/Roles.Guard';
import { AuthGuard } from '@App/Common/Guards/Auth.Guard';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { CheckoutsuccessComponent } from '@App/Common/Widgets/Cart/checkoutsuccess/checkoutsuccess.component';
import { RolesEnum } from '@App/Common/Enums/Roles.Enum';

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
				path: 'cart',
				loadComponent: () => import('@App/Common/Widgets/Cart/cart.component').then((c) => c.CartComponent)
			},
			{
				path: 'success',
				component: CheckoutsuccessComponent,
			},
			{
				path: 'notifications',
				loadComponent: () => import('@App/Features/Notifications/Notifications').then((c) => c.NotificationsComponent)
			},
			{
				path: 'faq',
				loadComponent: () => import('@App/Features/Faq/Faq').then((c) => c.FaqComponent)
			},
			{
				path: 'teach-with-us',
				loadComponent: () => import('@App/Features/TeachWithUs/TeachWithUs').then((c) => c.TeachWithUsComponent)
			},
			{
				canActivate: [AuthGuard],
				path: 'dashboard',
				loadComponent: () => import('@App/Features/Dashboard/Dashboard').then((c) => c.DashboardComponent),
				children: [
					{
						canActivate: [RolesGuard],
						data: {
							Roles: [
								RolesEnum.Admin
							]
						},
						path: 'courses',
						loadComponent: () => import('@App/Features/Dashboard/Courses/Courses').then((c) => c.CoursesComponent),
						pathMatch: 'full'
					},
					{
						path: 'classes',
						loadComponent: () => import('@App/Features/Dashboard/Classes/Classes').then((c) => c.ClassesComponent),
						pathMatch: 'full'
					},
					{
						canActivate: [RolesGuard],
						data: {
							Roles: [
								RolesEnum.Admin
							]
						}, path: 'courses/:id',
						loadComponent: () => import('@App/Features/Dashboard/CourseDetails/CourseDetails').then((c) => c.CourseDetailsComponent),
						pathMatch: 'full'
					},
					{
						canActivate: [RolesGuard],
						data: {
							Roles: [
								RolesEnum.Admin
							]
						}, path: 'courses/:cid/class/:id',
						loadComponent: () => import('@App/Features/Dashboard/ClassDetails/ClassDetails').then((c) => c.ClassDetailsComponent)
					},
					{
						path: 'upcoming-sessions',
						loadComponent: () => import('@App/Features/Dashboard/UpcomingSessions/UpcomingSessions').then((c) => c.UpcomingSessionsComponent)
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
						path: 'notifications',
						loadComponent: () => import('@App/Features/Profile/EditNotifications/EditNotifications').then((c) => c.EditNotificationsComponent)
					},
					{
						path: 'payment-history',
						loadComponent: () => import('@App/Features/Profile/PaymentHistory/PaymentHistory').then((c) => c.PaymentHistoryComponent)
					},
					{
						path: 'password',
						loadComponent: () => import('@App/Features/Profile/EditPassword/Password').then((c) => c.PasswordComponent)
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
