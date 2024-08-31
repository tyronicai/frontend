import { EstatePart } from './estatePart.model';
import { FlatTypeEnum } from './flatType.model';

export class EstatesFlat {
	constructor(argFlatTypeEnum: FlatTypeEnum) {
		this.FlatTypeId = argFlatTypeEnum;
		this.Id = 0;
		this.EstateId = 0;
		this.EstateTypeId = 0;
		this.floorOfEstate = 0;
		this.numberOfRooms = 0;
		this.sqMtOfFloor = 15;
		this.TargetFloor = null;
		this.EstateParts = [];
		this.EstateSecondaryParts = [];
	}
	Id: number;
	FlatTypeId: number;
	EstateId: number;
	EstateTypeId: number;
	floorOfEstate: number;
	numberOfRooms: number;
	sqMtOfFloor: number;
	TargetFloor: number;
	EstateParts: EstatePart[];
	EstateSecondaryParts: EstatePart[];

	public generateStrippedDeepClone(): EstatesFlat {
		let lclFlat: EstatesFlat = Object.assign({}, this);
		lclFlat.EstateParts = [];

		for (var estatePart of this.EstateParts) lclFlat.EstateParts.push(estatePart.generateStrippedDeepClone());

		lclFlat.EstateSecondaryParts = [];
		for (var estatePart of this.EstateSecondaryParts)
			lclFlat.EstateSecondaryParts.push(estatePart.generateStrippedDeepClone());

		return lclFlat;
	}
}
