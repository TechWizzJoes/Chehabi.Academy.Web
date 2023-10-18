import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthModels } from '../Models/Auth.Models';
import { StorageEnum, StorageService } from '../Services/Storage.Service';
import { NotifyService } from '../Services/Notify.Service';
import { RoutePaths } from '../Settings/RoutePaths';
import { RolesEnum } from '../Enums/Roles.Enum';

@Injectable({ providedIn: 'root' })
export class RolesGuard {
	constructor(private router: Router, private StorageService: StorageService, private NotifyService: NotifyService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const CurrentUser = this.StorageService.GetLocalStorage<AuthModels.CurrentUserResModel>(
			StorageEnum.CurrentUser
		);
		const userRole = CurrentUser.IsAdmin ? RolesEnum.Admin : null;

		// Define the roles that are allowed to access the route
		const allowedRoles = route.data['Roles'] as string[];

		// If the user's role is in the allowed roles, allow access to the route
		if (allowedRoles.includes(userRole || '')) {
			return true;
		}
		// this.NotifyService.Error(ErrorCodesEnum.ACCESS_IS_DENIED);

		// If the user's role is not allowed, redirect to a different page (e.g., login)
		this.router.navigate([RoutePaths.Default]);
		return false;
	}
}
