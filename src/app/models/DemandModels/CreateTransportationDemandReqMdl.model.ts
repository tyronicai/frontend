import { DemandType } from './DemandType.model';
import { DemandStatusType } from './DemandStatusType.model';
import { DemandOwner } from './DemandOwner.model';
import { RequestBaseModel } from '../RequestModels/RequestBase.model';
import { Demand } from './Demand.model';
import { Transportation } from '../TransportationModels/Transportation.model';

export class CreateTransportationDemandReqMdl {
	constructor() {
		this.RequestBaseModel = new RequestBaseModel();
	}

	RequestBaseModel: RequestBaseModel;
	Demand: Demand;
	Transportation: Transportation;
}
