import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { I18nService } from '../../core/i18n.service';

// models
import { DemandType } from '../../models/DemandModels/DemandType.model';
import { DemandStatusType } from '../../models/DemandModels/DemandStatusType.model';
import { Demand } from '../../models/DemandModels/Demand.model';
import { DemandComment } from '../../models/DemandModels/DemandComment.model';
import { DemandOwner } from '../../models/DemandModels/DemandOwner.model';

import { LanguageIdText } from '../../models/coreModels/languageIdText.model';
import { OAKLanguage } from '../../models/coreModels/oakLanguage.model';
import { BooleanLiteral } from 'babel-types';
import { Transportation } from '../../models/TransportationModels/Transportation.model';
import { CreateTransportationDemandReqMdl } from '../../models/DemandModels/CreateTransportationDemandReqMdl.model';
import { EstatesFlat } from '../../models/EstateModels/estatesFlat.model';
import { EstatePart } from '../../models/EstateModels/estatePart.model';
import { EnumGenericAddressType } from '../../models/AddressModels/GenericAddressType.model';
import { environment } from '@env/environment';

const routes = {
	createTransportationDemand: () => '/DemandGW/CreateTransportationDemand',
};

@Injectable({
	providedIn: 'root',
})
export class DemandgwService {
	constructor(private http: HttpClient, private i18: I18nService) {}

	public createTransportationDemand(argDemand: Demand, argTransportation: Transportation) {
		let createTransportationDemandReqMdl: CreateTransportationDemandReqMdl = new CreateTransportationDemandReqMdl();
		// stripout decoration data;

		createTransportationDemandReqMdl.Demand = argDemand.generateStrippedDeepClone();
		createTransportationDemandReqMdl.Transportation = argTransportation.generateStrippedDeepClone();
		createTransportationDemandReqMdl.Transportation.FromAddress.GenericAddressTypeId =
			EnumGenericAddressType.CustomerContactAddress;
		createTransportationDemandReqMdl.Transportation.ToAddress.GenericAddressTypeId =
			EnumGenericAddressType.CustomerContactAddress;
		this.http
			.post(
				environment.baseURL + this.i18.language + routes.createTransportationDemand(),
				createTransportationDemandReqMdl
			)
			.subscribe((response) => {
				// console.log('createTransportationDemand => response:' + JSON.stringify(response));
			});
	}
}
