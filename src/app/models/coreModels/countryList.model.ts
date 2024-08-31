import { LanguageIdText } from '../coreModels/languageIdText.model';

export class CountryList {
	id: Number;
	name: String;
	isoCode2: String;
	isoCode3: String;
	cultureName: String;
	countryCode: String;
	countryCodeLength: String;
	areaCodes: null;
	phoneAreaCodeMinLength: 2;
	phoneAreaCodeMaxLength: 2;
	phoneSubscriberNumberLengthMin: Number;
	phoneSubscriberNumberLengthMax: Number;
	languageIdTexts: LanguageIdText[];
	isActive: true;
}
