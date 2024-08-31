import { LanguageIdText } from './languageIdText.model';

export class ResultBaseModel {
	constructor() {
		this.isValid = true;
		this.description = '';
	}
	isValid: boolean;
	description: string;
}
