import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../Services/Storage.Service';
import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private StorageService: StorageService,
		private AuthService: AuthService,
		private NotifyService: NotifyService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		//console.log('AuthGuard');

		//console.log(state.url);
		if (this.AuthService.IsAuthenticated) {
			//console.log("Auth Guard: " + this.AuthService.IsAuthenticated);
			return true;

			// const roles = route.data.Roles as Array<string>;
			// const currentUser = this.StorageService.CurrentUserGet() as CurrentUserDto;

			// console.log(roles);
			// console.log(currentUser);

			// if (!roles) {
			// 	return true;
			// }

			// if (roles.indexOf(currentUser.CurrentRole) > -1) {
			// 	return true;
			// }

			// this.NotifyService.Error(MessagesEnum.ACCESS_DENIED);
			// return false;
		}

		this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
		return false;
	}
}
