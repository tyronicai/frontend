import { Role } from './Role.model';
export class AccountRoles {
	accountId: number;
	roleId: number;
	role?: Role;
	createDate?: Date;
}
