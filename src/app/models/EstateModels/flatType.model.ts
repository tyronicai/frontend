import { LanguageIdText } from '../coreModels/languageIdText.model';

export enum FlatTypeEnum {
	Apartment = 1,
	Cellar = 2,
	GardenGarage = 3,
	Loft = 4,
}

export class FlatType {
	id: number;
	name: string;
	isActive: boolean;
	languageIdTexts: LanguageIdText[];
}
