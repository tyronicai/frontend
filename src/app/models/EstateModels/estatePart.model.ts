import { Furniture } from './furniture.model';
import { FurnitureGroupType } from './furnitureGroupType.model';
import { EstatePartType } from './estatePartType.model';

export class EstatePart {
	constructor(estatePartTypeId: number = 0) {
		this.id = 0;
		this.estateId = 0;
		this.estatePartTypeId = estatePartTypeId;
		this.TargetFloor = null;
		this.estatePartType = null;
		this.propertyValues = '';
		this.furnitures = [];
		this.mainFurnitureGroupList = [];
		this.secondaryFurnitureGroupList = [];
		this.numberOfFurnitures = 0;
		this.volumeOfFurnitures = 0;
	}

	id: number;
	estateId: number;
	estatePartTypeId: number;
	estatePartType: EstatePartType;
	TargetFloor: number;
	propertyValues: string;
	furnitures: Furniture[];
	mainFurnitureGroupList: FurnitureGroupType[];
	secondaryFurnitureGroupList: FurnitureGroupType[];
	numberOfFurnitures: number;
	volumeOfFurnitures: number;

	public generateStrippedDeepClone(): EstatePart {
		let lclEstatePart = Object.assign({}, this);
		lclEstatePart.estatePartType = null;
		lclEstatePart.furnitures = [];
		if (this.furnitures != undefined) {
			for (var furniture of this.furnitures) {
				if (furniture.NumberOfFurnitures > 0) {
					lclEstatePart.furnitures.push(furniture.generateStrippedDeepClone());
				}
			}
		}
		return lclEstatePart;
	}

	public getNumberOfFurnituresInFurnitureGroup(furnitureGroupId: number): number {
		let lclNumberOfFurnitures = 0;
		for (let furniture of this.furnitures) {
			if (furniture.FurnitureType.furnitureGroupTypeId == furnitureGroupId) {
				lclNumberOfFurnitures += furniture.NumberOfFurnitures;
			}
		}
		return lclNumberOfFurnitures;
	}
}
