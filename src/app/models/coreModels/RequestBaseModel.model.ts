import { LanguageIdText } from '../coreModels/languageIdText.model';

export class RequestBaseModel {
	constructor() {
		this.isValid = true;
		this.Description = '';
	}
	isValid: boolean;
	Description: string;
}
