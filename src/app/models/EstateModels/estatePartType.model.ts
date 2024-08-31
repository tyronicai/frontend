import { LanguageIdText } from '../coreModels/languageIdText.model';

export enum EstatePartTypeEnum {
	LivingRoom = 1,
	Bedroom = 2,
	Kitchen = 3,
	DiningRoom = 4,
	ChildRoom = 5,
	StudyRoom = 6,
	GuestRoom = 7,
	Bath = 8,
	EntranceHallwayCorridor = 9,
	BalkonyTerrace = 10,
	StorageBoxroom = 11,
	Cellar = 12,
	GardenGarage = 13,
	DressingRoom = 14,
	warehouse = 15,
	office = 16,
	Loft = 17,
}

export class EstatePartType {
	id: number;
	name: string;
	isActive: boolean;
	isOuterPart: boolean;
	languageIdTexts: LanguageIdText[];
}
