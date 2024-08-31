import { DemandType } from './DemandType.model';
import { DemandStatusType, EnumDemandStatusType } from './DemandStatusType.model';
import { DemandOwner } from './DemandOwner.model';

export enum EnumDemandType {
	Transportation = 1,
}

export class Demand {
	constructor() {
		this.Id = 0;
		this.DemandTypeId = EnumDemandType.Transportation;
		this.DemandType = null;
		this.DemandStatusTypeId = EnumDemandStatusType.Preparing;
		this.DemandStatusType = null;
		this.DemandOwnerId = 0;
		this.DemandOwner = null;
		this.AccountId = null;
		//Account: Account;
		this.propertyValues = null;
	}

	Id: number;
	DemandTypeId: number;
	DemandType: DemandType;
	DemandStatusTypeId: number;
	DemandStatusType: DemandStatusType;
	DemandOwnerId: number;
	DemandOwner: DemandOwner;
	AccountId: number;
	//Account: Account;
	propertyValues: string;

	public generateStrippedDeepClone(): Demand {
		let lclDemand: Demand = Object.assign({}, this);
		lclDemand.DemandType = null;
		lclDemand.DemandStatusType = null;
		lclDemand.DemandOwner = this.DemandOwner.generateStrippedDeepClone();
		return lclDemand;
	}
}
