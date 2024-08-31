import { RequestBaseModel } from './RequestBase.model';

export class PostCodesByDataReqMdl {
	RequestBaseModel: RequestBaseModel;
	countryId: number;
	postCodeStr: string;
	placeNameStr: string;

	constructor() {
		this.RequestBaseModel = new RequestBaseModel();
		this.countryId = 0;
		this.postCodeStr = '';
		this.placeNameStr = '';
	}
}
