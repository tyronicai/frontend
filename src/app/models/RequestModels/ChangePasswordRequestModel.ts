import { User } from '@app/models/AccountModels/Account.model';

export class ChangePasswordRequestModel {
	Account: User;
	NewPassword: string;
}
