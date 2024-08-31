import { LanguageIdText } from '../coreModels/languageIdText.model';

export class FurnitureGroupType {
	constructor() {
		this.numberOfFurnitures = 0;
	}
	id: number;
	name: string;
	languageIdTexts: LanguageIdText[];
	numberOfFurnitures: number;
}
