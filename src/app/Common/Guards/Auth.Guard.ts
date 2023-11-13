import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@App/Common/Services/Auth.Service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
	constructor(
		private router: Router,
		private AuthService: AuthService,
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.AuthService.IsAuthenticated) {
			return true;
		}

		this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
		return false;
	}
}
