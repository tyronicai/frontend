import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { I18nService } from '../../core/i18n.service';

//models
import { Transportation } from '../../models/TransportationModels/Transportation.model';
import { TransportationType } from '../../models/TransportationModels/TransportationType.model';
import { TransportationStatusType } from '../../models/TransportationModels/TransportationStatusType.model';
import { TransportationDocument } from '../../models/TransportationModels/TransportationDocument.model';
import { TransportationComment } from '../../models/TransportationModels/TransportationComment.model';
import { Estate } from '../../models/EstateModels/estate.model';
import { GenericAddress } from '../../models/AddressModels/GenericAddress.model';
import { Demand } from '../../models/DemandModels/Demand.model';
import { TransCalRes } from '../../models/TransportationModels/TransCalRes.model';
import { RequestBaseModel } from '../../models/RequestModels/RequestBase.model';
import { ResultBaseModel } from '../../models/coreModels/ResultBaseModel.model';
import { TransCalReq } from '../../models/TransportationModels/TransCalReq.model';
import { environment } from '@env/environment';

// routes
const routes = {
	routeGetAllTransportationTypes: () => '/Transportation/GetAllTransportationTypes',
	routeGetAllTransportationStatusTypes: () => '/Transportation/GetAllTransportationStatusTypes',
	routeGetUserTransportations: () => '/Transportation/GetUserTransportations',
	routeAddUserTransportation: () => '/Transportation/AddUserTransportation',
	routeCalculateTransportationCostML: () => '/Transportation/CalculateTransportationCostML',
	routeGetTransportationMapData: () => '/Transportation/GetTransportationMapData',
};

export class FloorVolume {
	minM2: number;
	maxM2: number;
	volume: number;
	numberOfPerson: number;
}

const floorVolumeList: FloorVolume[] = [
	{ minM2: 1, maxM2: 15, volume: 14, numberOfPerson: 1 },
	{ minM2: 16, maxM2: 30, volume: 19, numberOfPerson: 1 },
	{ minM2: 31, maxM2: 45, volume: 26, numberOfPerson: 1 },
	{ minM2: 46, maxM2: 60, volume: 31, numberOfPerson: 2 },
	{ minM2: 61, maxM2: 75, volume: 37, numberOfPerson: 2 },
	{ minM2: 76, maxM2: 90, volume: 43, numberOfPerson: 2 },
	{ minM2: 91, maxM2: 105, volume: 49, numberOfPerson: 3 },
	{ minM2: 106, maxM2: 120, volume: 55, numberOfPerson: 3 },
	{ minM2: 121, maxM2: 135, volume: 61, numberOfPerson: 4 },
	{ minM2: 136, maxM2: 150, volume: 67, numberOfPerson: 4 },
	{ minM2: 151, maxM2: 165, volume: 73, numberOfPerson: 4 },
	{ minM2: 166, maxM2: 180, volume: 79, numberOfPerson: 4 },
	{ minM2: 181, maxM2: 195, volume: 85, numberOfPerson: 4 },
	{ minM2: 196, maxM2: 210, volume: 90, numberOfPerson: 5 },
	{ minM2: 211, maxM2: 225, volume: 96, numberOfPerson: 5 },
	{ minM2: 226, maxM2: 240, volume: 102, numberOfPerson: 5 },
	{ minM2: 241, maxM2: 255, volume: 108, numberOfPerson: 6 },
];

@Injectable({
	providedIn: 'root',
})
export class TransportationService {
	private currentTransportation: Transportation;
	private transportationTypes: TransportationType[];
	private transportationStatusTypes: TransportationStatusType[];
	public transCalRes: TransCalRes;

	constructor(private httpService: HttpClient, private i18: I18nService) {
		// console.log('TransportationService instance created.');
	}

	public init() {
		const startTime = performance.now();

		this.getAllTransportationTypes();
		this.getAllTransportationStatusTypes();
		this.addUserTransportation();

		const duration = performance.now() - startTime;
		// console.log('someMethodIThinkMightBeSlow took ${duration}ms');
	}

	public getAllTransportationTypes() {
		return this.httpService
			.post(environment.baseURL + this.i18.language + routes.routeGetAllTransportationTypes(), {})
			.pipe(
				tap((a) => (this.transCalRes = a['transCallRes'])),
				map((a) => a['transCallRes']),
				catchError((err, caught) => caught)
			);
	}

	public getAllTransportationStatusTypes() {
		return this.httpService
			.post(environment.baseURL + this.i18.language + routes.routeGetAllTransportationStatusTypes(), {})
			.pipe(
				tap((a) => (this.transportationTypes = a['ueTransportationStatusTypeList'])),
				map((a) => a['ueTransportationStatusTypeList']),
				catchError((err, caught) => caught)
			);
	}

	public CalculateTransportationCostML() {
		let transCalReq: TransCalReq = new TransCalReq();

		transCalReq.minM2 = this.currentTransportation.FromEstate.totalSquareMeter - 14;
		transCalReq.maxM2 = this.currentTransportation.FromEstate.totalSquareMeter;
		transCalReq.fromFloor = this.currentTransportation.FromEstate.floorOfEstate;
		transCalReq.toFloor = this.currentTransportation.ToEstate.floorOfEstate;
		transCalReq.fromElevatorType = this.currentTransportation.FromEstate.elevatorAvailability;
		transCalReq.toElevatorType = this.currentTransportation.ToEstate.elevatorAvailability;
		transCalReq.fromWalkingWay = 10;
		transCalReq.toWalkingWay = 10;
		transCalReq.numberOfPerson = this.currentTransportation.NumberOfPeople;
		transCalReq.fromLatitude = 0;
		transCalReq.fromLongitude = 0;
		transCalReq.toLatitude = 0;
		transCalReq.toLongitude = 0;
		transCalReq.dinstanceInKM = this.currentTransportation.TransportationDistanceMax;

		this.httpService
			.post(environment.baseURL + this.i18.language + routes.routeCalculateTransportationCostML(), transCalReq)
			.subscribe(
				(res) => {
					let resBaseMdl: ResultBaseModel = res['resultBaseMdl'];
					if (resBaseMdl.isValid) {
						this.transCalRes = res['transCalRes'];
					}
				},
				(error) => {
					console.log('CalculateTransportationCostML:' + error);
				}
			);
	}

	public getTransportationMapData() {
		return this.httpService.post(
			environment.baseURL + this.i18.language + routes.routeGetTransportationMapData(),
			{}
		);
	}

	public addUserTransportation() {}

	//getter and setters

	public getCurrentTransportation(): Transportation {
		if (undefined == this.currentTransportation) {
			this.currentTransportation = new Transportation();

			this.currentTransportation.FromEstate = new Estate();
			this.currentTransportation.FromEstate.EstateTypeId = 1;
			this.currentTransportation.FromEstate.elevatorAvailability = 0;

			this.currentTransportation.ToEstate = new Estate();
			this.currentTransportation.ToEstate.EstateTypeId = 1;
			this.currentTransportation.ToEstate.elevatorAvailability = 0;

			this.currentTransportation.FromAddress = new GenericAddress();
			this.currentTransportation.ToAddress = new GenericAddress();

			this.currentTransportation.FromAddress.CountryId = 77;
			this.currentTransportation.FromAddress.PostCode = '';

			this.currentTransportation.ToAddress.CountryId = 77;
			this.currentTransportation.ToAddress.PostCode = '';

			this.currentTransportation.FromEstate.numberOfFloors = 1;
			this.currentTransportation.ToEstate.numberOfFloors = 1;

			this.currentTransportation.FromEstate.numberOfRooms = 1;
			this.currentTransportation.ToEstate.numberOfRooms = 1;

			this.currentTransportation.FromEstate.totalSquareMeter = 75;
			this.currentTransportation.ToEstate.totalSquareMeter = 75;

			this.currentTransportation.NumberOfPeople = 1;

			this.currentTransportation.FromEstate.floorOfEstate = 0;
			this.currentTransportation.ToEstate.floorOfEstate = 0;

			this.currentTransportation.FromEstate.furnitureMontage = false;
			this.currentTransportation.FromEstate.kitchenMontage = false;
			this.currentTransportation.FromEstate.packingService = false;
			this.currentTransportation.FromEstate.hasLoft = false;
			this.currentTransportation.FromEstate.hasGardenGarage = false;
			this.currentTransportation.FromEstate.hasCellar = false;
			this.currentTransportation.FromEstate.loftFloor = 0;
			this.currentTransportation.FromEstate.gardenGarageFloor = 0;
			this.currentTransportation.FromEstate.cellarFloor = 0;
			this.currentTransportation.FromEstate.loftSqMt = 15;
			this.currentTransportation.FromEstate.gardenGarageSqMt = 15;
			this.currentTransportation.FromEstate.cellarSqMt = 15;

			this.currentTransportation.ToEstate.furnitureMontage = false;
			this.currentTransportation.ToEstate.kitchenMontage = false;
			this.currentTransportation.ToEstate.packingService = false;
			this.currentTransportation.ToEstate.hasLoft = false;
			this.currentTransportation.ToEstate.hasGardenGarage = false;
			this.currentTransportation.ToEstate.hasCellar = false;
			this.currentTransportation.ToEstate.loftFloor = 0;
			this.currentTransportation.ToEstate.gardenGarageFloor = 0;
			this.currentTransportation.ToEstate.cellarFloor = 0;
			this.currentTransportation.ToEstate.loftSqMt = 15;
			this.currentTransportation.ToEstate.gardenGarageSqMt = 15;
			this.currentTransportation.ToEstate.cellarSqMt = 15;

			this.currentTransportation.TransportationDistanceMax = 15;
			this.currentTransportation.TransportationDistanceMin = 1;
			this.currentTransportation.InitialTransportationDate = new Date();
			this.currentTransportation.FinalTransportationDate = new Date();
		}

		return this.currentTransportation;
	}

	get getCurrentFromDataCountry() {
		return this.currentTransportation.FromAddress.CountryId;
	}

	get getCurrentToDataCountry() {
		return this.currentTransportation.ToAddress.CountryId;
	}

	public setCurrentTransportation(arg: Transportation) {
		this.currentTransportation = arg;
	}

	private CalculateVolume(): number {
		let floorVolIndex: number = 0;
		let volume: number = 0;

		floorVolIndex = floorVolumeList.findIndex(
			(p) => p.maxM2 == this.currentTransportation.FromEstate.totalSquareMeter
		);

		let rFloorVolume: FloorVolume = floorVolumeList[floorVolIndex];
		volume = rFloorVolume.volume;
		for (
			let numOfPeopleIdx: number = rFloorVolume.numberOfPerson;
			numOfPeopleIdx < this.currentTransportation.NumberOfPeople;
			numOfPeopleIdx++
		) {
			volume += ((rFloorVolume.volume / rFloorVolume.numberOfPerson) * 2) / 3;
		}

		return volume;
	}

	public TotalVolume(): string {
		let totalVol: number = 0;
		if (this.currentTransportation.IsFixedPrice == true) {
			for (let flat of this.currentTransportation.FromEstate.Flats) {
				for (let estatePart of flat.EstateParts) totalVol += estatePart.volumeOfFurnitures;
			}
			return totalVol.toFixed(2);
		} else {
			return this.CalculateVolume().toFixed(2);
		}
	}

	public getTransCalRes(): TransCalRes {
		if (this.transCalRes == undefined) {
			this.CalculateTransportationCostML();
		}

		return this.transCalRes;
	}
}
