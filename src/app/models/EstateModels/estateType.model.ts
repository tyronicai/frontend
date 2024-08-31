import { LanguageIdText } from '../coreModels/languageIdText.model';

export class EstateType {
	id: number;
	name: string;
	isActive: boolean;
	languageIdTexts: LanguageIdText[];
}
