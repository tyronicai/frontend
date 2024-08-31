import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Logger } from '@app/services/logger/logger.service';
import { UserService } from '../services/user/user.service';

const log = new Logger('AuthenticationGuard');

@Injectable({
	providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
	constructor(private router: Router, private userService: UserService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.userService.currentUserValue) {
			return true;
		}

		log.debug('Not authenticated, redirecting and adding redirect url...');
		this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
		return false;
	}
}
