import { Estate } from '../EstateModels/estate.model';
import { GenericAddress } from '../AddressModels/GenericAddress.model';
import { Demand } from '../DemandModels/Demand.model';
import { Timestamp } from 'rxjs';
import { TransMapDataRes } from './TransMapDataRes.model';

export class Transportation {
	Id: number;
	DemandId: number;
	TransportationTypeId: number;
	TransportationStatusTypeId: number;
	NumberOfPeople: number;

	InitialTransportationDate: Date;
	FinalTransportationDate: Date;
	DateFlexibility: Boolean;

	TransportationDistanceMax: number;
	TransportationDistanceMin: number;

	TransportationEstimatedValue: number;
	TransportationMaxOfferedValue: number;
	TransportationMinOfferedValue: number;
	TransportationAverageOfferedValue: number;
	TransportationNumberOfOffers: number;

	TransportationContractValue: number;
	TransportationVAT: number;
	TransportationGrossValue: number;
	TransportationCommission: number;

	IsFixedPrice: boolean;
	FromEstate: Estate;
	ToEstate: Estate;

	FromAddress: GenericAddress;

	ToAddress: GenericAddress;

	ExtraInfoLanguageId: number;
	ExtraInfo: string;
	TransportationMapData: TransMapDataRes;
	TransMapDataAvailable: boolean;

	public generateStrippedDeepClone(): Transportation {
		let lclTransportation: Transportation = Object.assign({}, this);
		lclTransportation.FromEstate = this.FromEstate.generateStrippedDeepClone();
		lclTransportation.ToEstate = this.ToEstate.generateStrippedDeepClone();

		lclTransportation.FromAddress = this.FromAddress.generateStrippedDeepClone();
		lclTransportation.ToAddress = this.ToAddress.generateStrippedDeepClone();
		return lclTransportation;
	}
}
