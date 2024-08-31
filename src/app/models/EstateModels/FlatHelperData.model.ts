import { Furniture } from './furniture.model';

export class EstatePartHelperData {
	estatePartTypeId: number;
	furnitureList: Furniture[];
}

export class FlatHelperData {
	constructor(argEstatePartTypeId: number) {
		this.estatePartTypeId = argEstatePartTypeId;
		this.numberOfEstatePart = 0;
	}
	estatePartTypeId: number;
	numberOfEstatePart: number;
	estatePartHelperList: EstatePartHelperData[];
}
