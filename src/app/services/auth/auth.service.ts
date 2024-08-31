import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

// import { JwtHelperService } from '@auth0/angular-jwt';
// Models
import { User } from '../../models/AccountModels/Account.model';

// Service
import { UserService } from '../user/user.service';
import { map, tap } from 'rxjs/operators';
import { I18nService } from '@app/core';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient, private userService: UserService, private i18: I18nService) {}

	public login(Email: string, Password: string) {
		return this.http
			.post<any>(
				environment.baseURL + this.i18.language + '/Accounts/authenticate',
				{ Email, Password },
				{ withCredentials: true }
			)
			.pipe(
				map((data) => {
					if (data.isValid) {
						data.account.token = data.token;
						data.account.refresh = data.refreshToken;
						this.userService.setCurrentUser(data.account);
						this.userService.setAccessToken(data.token);
						this.userService.setRefreshToken(data.refreshToken);
						this.userService.setIsFirstLogin();
					}
					return data;
				})
			);
	}

	public register(user: User) {
		const credentials = {
			Email: user.email,
			FirstName: user.firstName,
			LastName: user.lastName,
			Username: user.username,
			PhoneNumber: user.phoneNumber,
			Password: user.password,
		};
		return this.http.post(environment.baseURL + this.i18.language + '/Accounts/register', credentials);
	}

	public verifyEmail(Email: string, ActivationCode: number) {
		this.http.post(environment.baseURL + 'TR-tr/Accounts/verifyemail', {
			Email,
			ActivationCode,
		});
	}

	public refreshToken() {
		return this.http
			.post<any>(environment.baseURL + this.i18.language + '/Accounts/refreshToken', {
				refreshToken: this.userService.currentUserValue.refresh,
			})
			.pipe(
				tap((tokens: any) => {
					this.userService.setRefreshToken(tokens.RefreshToken);
					this.userService.setAccessToken(tokens.AccessToken);
				})
			);
	}
}
