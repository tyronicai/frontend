import { AccountRoles } from './AccountRoles.model';
export class User {
	id?: number;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	loginAttempts?: number;
	phoneNumber: number;
	lastLoginDate?: Date;
	emailActivationDate?: Date;
	lastPasswordChangeDate?: Date;
	email: string;
	isEmailActivated: boolean;
	twoFactorAuthenticationEnabled?: boolean;
	isActive: boolean;
	activationCode: number;
	token: string;
	refresh: string;
	accountRoles: AccountRoles;
	demands: string;
	customerType: number;
	createDate: Date;
}

export class Account {
	id?: number;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	loginAttempts?: number;
	phoneNumber: number;
	lastLoginDate?: Date;
	emailActivationDate?: Date;
	lastPasswordChangeDate?: Date;
	email: string;
	isEmailActivated: boolean;
	twoFactorAuthenticationEnabled?: boolean;
	isActive: boolean;
	activationCode: number;
	token: string;
	refresh: string;
	accountRoles: AccountRoles;
	demands: string;
	customerType: number;
	createDate: Date;
}
