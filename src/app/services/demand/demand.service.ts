import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { I18nService } from '../../core/i18n.service';

// models
import { DemandType } from '../..//models/DemandModels/DemandType.model';
import { DemandStatusType } from '../..//models/DemandModels/DemandStatusType.model';
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
import { Account } from '../../models/AccountModels/Account.model';
import { CompanyDemandService } from '../../models/CompanyModels/CompanyDemandService.model';
import { AcceptOfferReqMdl } from '../../models/RequestModels/AcceptOfferReqMdl.model';
import { environment } from '@env/environment';

const routes = {
	getDemandTypes: () => '/Demand/GetAllDemandTypes',
	getDemandStatusTypes: () => '/Demand/GetAllDemandStatusTypes',
	getDemandCommentTypes: () => '/Demand/GetAllDemandCommentTypes',
	getDemandMetadata: () => '/Demand/GetDemandMetaData',
	getDemandsById: () => '/Demand/GetDemandsById',
	GetTransportationsOfDemandsByAccountId: () => '/Demand/GetTransportationsOfDemandsByAccountId',
	getAllCompanyDemandServicesById: () => '/Company/GetAllCompanyDemandServicesById',
	acceptOffer: () => '/DemandGW/AcceptOffer',
};

@Injectable({
	providedIn: 'root',
})
export class DemandService {
	private DemandTypeList: DemandType[];
	private DemandStatusTypeList: DemandStatusType[];
	private DemandCommentList: DemandComment[];
	private currentDemand: Demand;

	constructor(private http: HttpClient, private i18: I18nService) {}

	load() {
		return new Promise((resolve, reject) => {
			this.http
				.post(environment.baseURL + this.i18.language + routes.getDemandMetadata(), {})
				.subscribe((response) => {
					this.DemandTypeList = response['ueDemandTypeList'];
					this.DemandStatusTypeList = response['ueDemandStatusTypeList'];
					resolve(true);
				});
		});
	}

	public getCurrentDemand(): Demand {
		if (undefined == this.currentDemand) {
			this.currentDemand = new Demand();
			this.currentDemand.DemandOwner = new DemandOwner();
			this.currentDemand.DemandOwner.Name = '';
			this.currentDemand.DemandOwner.Title = '';
			this.currentDemand.DemandOwner.EMail = '';
			this.currentDemand.DemandOwner.PhoneNumber = '';
			this.currentDemand.DemandOwner.PreferredCulture = '';
			this.currentDemand.DemandOwner.AlternativeCulture = '';
		}
		return this.currentDemand;
	}

	public setCurrentDemand(arg: Demand) {
		this.currentDemand = arg;
	}

	public GetTransportationsOfDemandsByAccountId() {
		let l_demand = new Demand();
		l_demand.DemandStatusTypeId = 2;
		l_demand.AccountId = 3;

		return new Promise((resolve, reject) => {
			this.http
				.post(
					environment.baseURL + this.i18.language + routes.GetTransportationsOfDemandsByAccountId(),
					l_demand
				)
				.subscribe(
					(response) => {
						// console.log(response);
						resolve(response);
					},
					(error) => {
						// console.log(error);
						reject(error);
					}
				);
		});
	}

	public getDemandsById(userId: number) {
		let l_demand = new Demand();
		l_demand.AccountId = userId;
		l_demand.DemandStatusTypeId = 1;

		return new Promise((resolve, reject) => {
			this.http.post(environment.baseURL + this.i18.language + routes.getDemandsById(), l_demand).subscribe(
				(response) => {
					// console.log(response);
					resolve(response);
				},
				(error) => {
					// console.log(error);
					reject(error);
				}
			);
		});
	}

	public GetAllCompanyDemandServicesById(demandId: number) {
		let companyDemandServiceModel = new CompanyDemandService();
		companyDemandServiceModel.DemandId = demandId;

		return new Promise((resolve, reject) => {
			this.http
				.post(
					environment.baseURL + this.i18.language + routes.getAllCompanyDemandServicesById(),
					companyDemandServiceModel
				)
				.subscribe(
					(response) => {
						// console.log(response);
						resolve(response);
					},
					(error) => {
						// console.log(error);
						reject(error);
					}
				);
		});
	}

	public AcceptOffer(acceptOfferReqMdl: AcceptOfferReqMdl) {
		return new Promise((resolve, reject) => {
			this.http.post(environment.baseURL + this.i18.language + routes.acceptOffer(), acceptOfferReqMdl).subscribe(
				(response) => {
					resolve(response);
				},
				(error) => {
					reject(error);
				}
			);
		});
	}
}
