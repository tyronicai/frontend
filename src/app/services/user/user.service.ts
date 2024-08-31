import { Injectable } from '@angular/core';
import { Account, User } from '../../models/AccountModels/Account.model';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { StorageService } from '../storage/storage.service';
const routes = {
	getAllAccounts: () => 'tr-TR/Accounts/GetAll',
	updateAccount: () => 'tr-TR/Accounts/UpdateAccount',
	sendForgotPasswordMail: () => 'tr-TR/Accounts/SendPasswordForgotEmail',
	getOwnAccount: () => 'tr-TR/Accounts/GetOwnAccount',
	changePassword: () => 'tr-TR/Accounts/ChangePassword',
	resendActivationMail: () => 'tr-TR/Accounts/ResendActivationMail',
};

@Injectable({
	providedIn: 'root',
})
export class UserService {
	public currentUser: Observable<User>;
	private currentUserSubject: BehaviorSubject<User>;
	private userLogStatus?: boolean = null;

	constructor(public storageService: StorageService) {
		this.currentUserSubject = new BehaviorSubject<User>(null);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public getCurrentUser(): Observable<any> {
		return from(this.storageService.getObject('user'));
	}

	public getIsFirstLogin(): Observable<any> {
		return from(this.storageService.getString('isFirst'));
	}

	public setIsFirstLogin(): void {
		const isExists = this.getIsFirstLogin();
		if (!isExists) {
			this.storageService.setString('isFirst', 'done');
		}
	}

	public getRefreshToken(): any {
		const refreshToken = this.storageService.getString('refresh_token');
		return refreshToken ? refreshToken : this.logout();
	}

	public getAccessToken(): any {
		const token = this.storageService.getString('access_token');
		token
			.then((t) => {
				return t.value;
			})
			.catch((error) => {
				return false;
			});
	}

	private getInitialAccessToken(): void {
		this.storageService
			.getString('access_token')
			.then((t) => {
				this.userLogStatus = true;
			})
			.catch((error) => {
				this.userLogStatus = false;
			});
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	public setCurrentUser(user: User) {
		this.currentUserSubject.next(user);
		this.storageService.setObject('user', user);
	}

	public setRefreshToken(refreshToken: string) {
		this.storageService.setString('refresh_token', refreshToken);
	}

	public setAccessToken(accessToken: string) {
		this.storageService.setString('access_token', accessToken);
	}

	public isUserLoggedIn() {
		return this.userLogStatus;
		//const token = !!this.getAccessToken();
		//return !!this.getAccessToken();
	}

	public logout() {
		this.storageService.removeItem('access_token');
		this.storageService.removeItem('refresh_token');
		this.storageService.removeItem('user');
		this.currentUserSubject.next(null);
		this.userLogStatus = false;
	}
}

/*
export class UserService {
	constructor(private http: HttpClient, public credentialsService: CredentialsService) {}

	getAllAccounts() {
		return new Promise((resolve, reject) => {
			this.http.get(routes.getAllAccounts()).subscribe(
				(response) => {
					resolve(response['items']);
				},
				(error) => {
					reject(error);
				}
			);
		});
	}

	updateAccount(data: Account) {
		return new Promise((resolve, reject) => {
			this.http.post(routes.updateAccount(), data).subscribe(
				(response) => {
					resolve(response);
				},
				(error) => {
					reject(error);
				}
			);
		});
	}

	sendForgotPasswordMail(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(routes.sendForgotPasswordMail(), { Email: data }).subscribe(
				(response) => {
					resolve(response);
				},
				(error) => {
					reject(error);
				}
			);
		});
	}

	getOwnAccount() {
		return new Promise((resolve, reject) => {
			this.http.get(routes.getOwnAccount()).subscribe(
				(response) => {
					resolve(response);
				},
				(error) => {
					reject(error);
				}
			);
		});
	}

	changePassword(data: any) {
		return new Promise((resolve, reject) => {
			this.http.post(routes.changePassword(), data).subscribe(
				(response) => {
					resolve(response);
				},
				(error) => {
					reject(error);
				}
			);
		});
	}

	resendActivationMail(data: Account) {
		return new Promise((resolve, reject) => {
			this.http.post(routes.resendActivationMail(), data).subscribe(
				(response) => {
					resolve(response);
				},
				(error) => {
					reject(error);
				}
			);
		});
	}
}
*/
