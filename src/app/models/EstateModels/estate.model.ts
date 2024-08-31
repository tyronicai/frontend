import { EstatePart } from './estatePart.model';
import { EstatesFlat } from './estatesFlat.model';
import { EstateType } from './estateType.model';

export class Estate {
	constructor(estatePartTypeId: number = 0) {
		this.estateFurnitureVolume = 0;
	}

	Id: number;
	ParentEstateId: number;
	EstateTypeId: number;
	estateType: EstateType;
	propertyValues: string;
	floorOfEstate: number;
	numberOfFloors: number;
	numberOfRooms: number;
	totalSquareMeter: number;
	elevatorAvailability: number; // 0: No, 1: Person, 2: Freight
	waitingPermission: boolean; //0: not wending; 1: Clent will arrange, 2: Company will arrange
	furnitureMontage: boolean;
	kitchenMontage: boolean;
	packingService: boolean;
	hasLoft: boolean;
	hasGardenGarage: boolean;
	hasCellar: boolean;
	loftFloor: number;
	gardenGarageFloor: number;
	cellarFloor: number;
	loftSqMt: number;
	gardenGarageSqMt: number;
	cellarSqMt: number;
	Flats: EstatesFlat[];
	estateFurnitureVolume: number;

	public generateStrippedDeepClone(): Estate {
		let lclEstate: Estate = Object.assign({}, this);
		lclEstate.estateType = null;
		lclEstate.Flats = [];
		if (this.Flats != undefined) {
			for (var subEstate of this.Flats) {
				lclEstate.Flats.push(subEstate.generateStrippedDeepClone());
			}
		}
		return lclEstate;
	}

	public TotalVolume(): string {
		let totalVol: number = 0;
		for (let flat of this.Flats) {
			for (let estatePart of flat.EstateParts) totalVol += estatePart.volumeOfFurnitures;
		}
		return totalVol.toFixed(2);
	}
}
