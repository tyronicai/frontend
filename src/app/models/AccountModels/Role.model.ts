export class Role {
	id: number;
	name: string;
	description?: string;
	isDefault?: boolean;
	isActive?: boolean;
	accountRoles?: string;
	localKey?: string;
	localizationKey?: string;
	createDate?: Date;

	Role() {}
}
