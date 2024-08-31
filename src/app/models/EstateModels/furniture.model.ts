import { FurnitureType } from './furnitureType.model';

export class Furniture {
	constructor() {
		this.Id = 0;
		this.FurnitureTypeId = 0;
		this.EstatePartId = 0;
		this.NumberOfFurnitures = 0;
		this.TargetFloor = null;
		this.propertyValues = null;
		this.FurnitureType = null;
		this.DoAssemble = false;
	}
	Id: number;
	FurnitureTypeId: number;
	EstatePartId: number;
	propertyValues: string;
	NumberOfFurnitures: number;
	TargetFloor: number;
	FurnitureType: FurnitureType;
	DoAssemble: boolean;

	public generateStrippedDeepClone(): Furniture {
		let lclFurniture: Furniture = Object.assign({}, this);
		lclFurniture.FurnitureType = null;

		return lclFurniture;
	}
}
