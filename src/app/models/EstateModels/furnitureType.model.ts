import { LanguageIdText } from '../coreModels/languageIdText.model';

export class FurnitureType {
	id: number;
	name: string;
	volume: number;
	isActive: boolean;
	furnitureGroupTypeId: number;
	assembleable: boolean;
	languageIdTexts: LanguageIdText[];
}
