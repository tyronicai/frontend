import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/AccountModels/Account.model';
import { UserService } from '@app/services/user/user.service';

import { UpdateAccountRequestModel } from 'src/app/models/RequestModels/UpdateAccountRequestModel';
import { ChangePasswordRequestModel } from 'src/app/models/RequestModels/ChangePasswordRequestModel';
import { environment } from '../../../environments/environment';
import { I18nService } from '@app/core';
import { ResetPasswordModel } from '@app/models/AccountModels/ResetPassword.model';

const routes = {
	UpdateAccount: () => '/Accounts/UpdateAccount',
	ChangePassword: () => '/Accounts/ChangePassword',
	sendForgotPasswordMail: () => '/Accounts/SendPasswordForgotEmail',
	resendActivationMail: () => '/Accounts/ResendActivationMail',
	resetPassword: () => 'Accounts/ResetPassword',
};

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	constructor(private http: HttpClient, private userService: UserService, private i18: I18nService) {}

	updateAccount(data: UpdateAccountRequestModel) {
		return new Promise((resolve, reject) => {
			this.http.post(environment.baseURL + this.i18.language + routes.UpdateAccount(), data).subscribe(
				(response: any) => {
					this.userService.setCurrentUser(response);
					resolve(true);
					console.log(response);
				},
				(error) => {
					console.log(error);
					reject(error);
				}
			);
		});
	}

	changePassword(data: ChangePasswordRequestModel) {
		console.log(data);

		return new Promise((resolve, reject) => {
			this.http.post(routes.ChangePassword(), data).subscribe(
				(response: any) => {
					console.log(response);

					if (null != response) {
						resolve(true);
					} else {
						resolve(false);
					}
					// this.userService.setCurrentUser(response);
				},
				(error) => {
					console.log(error);
					reject(false);
				}
			);
		});
	}

	sendForgotPasswordMail(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(environment.baseURL + this.i18.language + routes.sendForgotPasswordMail(), data).subscribe(
				(response) => {
					resolve(response);
				},
				(error) => {
					reject(error);
				}
			);
		});
	}

	resendActivationMail(data: User) {
		return new Promise((resolve, reject) => {
			this.http.post(environment.baseURL + this.i18.language + routes.resendActivationMail(), data).subscribe(
				(response) => {
					resolve(response);
				},
				(error) => {
					reject(error);
				}
			);
		});
	}

	resetPassword(pwd: string, repwd: string, token: string) {
		var data: ResetPasswordModel = {
			newPassword: pwd,
			confirmPassword: repwd,
			token: token,
		};
		return this.http.post(environment.baseURL + this.i18.language + routes.resetPassword(), data);
	}
}
