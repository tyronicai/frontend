import { LanguageIdText } from './languageIdText.model';

export class PostCodeData {
	id: number;
	isoCountryCode: string;
	postCode: string;
	placeName: string;
	adminName1: string;
	adminCode1: string;
	adminName2: string;
	adminCode2: string;
	adminName3: string;
	adminCode3: string;
	lattitude: number;
	longitude: number;
	accuracy: number;
	country: any;
}
