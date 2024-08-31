export class RequestBaseModel {
	IsValid: boolean;
	Description: string;

	constructor() {
		this.IsValid = true;
		this.Description = '';
	}
}
