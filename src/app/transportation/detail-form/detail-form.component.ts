import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// Services
import { TransportationService } from '@app/services/transportation/transportation.service';
import { CountryService } from '@app/services/country/country.service';
import { EstateService } from '@app/services/estate/estate.service';
import { I18nService } from '../../core/i18n.service';

// Models
import { Estate } from '@app/models/EstateModels/estate.model';
import { EstatesFlat } from '@app/models/EstateModels/estatesFlat.model';
import { EstatePartType, EstatePartTypeEnum } from '@app/models/EstateModels/estatePartType.model';
import { EPartTypeFrnGrpType } from '@app/models/EstateModels/ePartTypeFrnGrpType.model';
import { EstateTypeEPartType } from '@app/models/EstateModels/estateTypeEPartType.model';
import { Transportation } from '@app/models/TransportationModels/Transportation.model';
import { EstatePart } from '@app/models/EstateModels/estatePart.model';
import { Furniture } from '@app/models/EstateModels/furniture.model';
import { MatDialog } from '@angular/material/dialog';
import { DemandService } from '@app/services/demand/demand.service';
import { DemandgwService } from '@app/services/demandgw/demandgw.service';
import { Demand } from '@app/models/DemandModels/Demand.model';

// component
import { TfSubmitDialogComponent } from '../tf-submit-dialog/tf-submit-dialog.component';
import { FurnitureGroupType } from '@app/models/EstateModels/furnitureGroupType.model';
import { FrngrpFormComponent } from '../frngrp-form/frngrp-form.component';
import { UserService } from '@app/services/user/user.service';
import { Account } from '@app/models/AccountModels/Account.model';
import { FlatTypeEnum } from '@app/models/EstateModels/flatType.model';
import { CostinfoFormComponent } from '../costinfo-form/costinfo-form.component';
import { FormControl, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

export class Notifier {
	valueChanged: (data: boolean) => void = (d: boolean) => {};
}

@Component({
	selector: 'app-detail-form',
	templateUrl: 'detail-form.component.html',
	styleUrls: ['./detail-form.component.scss'],
})
export class DetailFormComponent implements OnInit, OnChanges, DoCheck {
	currentTransportation: Transportation;
	currentDemand: Demand;
	fromEstate: Estate;
	estatePartTypeList: EstatePartType[];

	selectedFloor = 0;
	furnitureGroupTypeList: FurnitureGroupType[];

	estatePartList = 0;

	floor = 0;
	isLoading = false;

	breakpoint1: number;
	breakpoint2: number;
	selectedFurniture: Furniture;
	selectedEstatePart: EstatePart;
	selectedEstatePartIdx: number;
	notifyObj = new Notifier();
	activeIndex: number;
	account: Account;
	explanationsFormControl = new FormControl('', [Validators.nullValidator]);
	constructor(
		private router: Router,
		public estateService: EstateService,
		private transportationService: TransportationService,
		private countryService: CountryService,
		private i18nService: I18nService,
		private demandService: DemandService,
		private demandgwService: DemandgwService,
		public dialog: MatDialog,
		public _snackBar: MatSnackBar,
		private userService: UserService
	) {
		if (this.userService.isUserLoggedIn()) {
			this.account = this.userService.currentUserValue;
			this.account.password = '';
			this.currentDemand.AccountId = this.account.id;
			this.selectedEstatePartIdx = 0;
			this.selectedFloor = 0;
		}
	}

	ngOnInit() {
		this.breakpoint1 = window.innerWidth <= 800 ? 1 : 6;
		this.breakpoint2 = window.innerWidth <= 800 ? 1 : 6;

		if (!this.estateService.isEstateMetaDataFetched()) {
			this.router.navigateByUrl('/transportation');
		}
		this.currentTransportation = this.transportationService.getCurrentTransportation();
		this.currentDemand = this.demandService.getCurrentDemand();
		this.fromEstate = this.currentTransportation.FromEstate;
		this.estatePartTypeList = this.estateService.getEstatePartTypeList();
		this.checkAndCreateEstates();
		this.selectedEstatePart = this.fromEstate.Flats[0].EstateParts[0];
		// console.log(this.currentTransportation);
	}

	ngDoCheck() {
		if (this.estatePartTypeList.length === 0) {
			this.estatePartTypeList = this.estateService.getEstatePartTypeList();
		}
	}

	onResize(event: any) {
		this.breakpoint1 = event.target.innerWidth <= 800 ? 1 : 6;
		this.breakpoint2 = event.target.innerWidth <= 800 ? 1 : 6;
	}

	ngOnChanges() {}
	matCardOnClick(furniture: Furniture, index: number) {
		// this.activeIndex = index;
		// this.notifyObj.valueChanged(false);
	}

	public ChangeNumberOfFurnitures(increment: number, furniture: Furniture) {
		this.selectedFurniture = furniture;
		this.selectedFurniture.NumberOfFurnitures += increment;
		if (this.selectedFurniture.NumberOfFurnitures < 0) {
			this.selectedFurniture.NumberOfFurnitures = 0;
		}

		this.notifyObj.valueChanged(true);
	}

	selectFloor(arg: number) {
		this.floor = arg;
	}

	estateFlatHeader(flatIndex: number): string {
		let retstring = '';
		if (this.fromEstate.Flats[flatIndex].FlatTypeId === FlatTypeEnum.Apartment) {
			retstring = this.estateService.getFlatTypeNameById(this.fromEstate.Flats[flatIndex].FlatTypeId) + ' ';

			if (this.fromEstate.Flats[flatIndex].floorOfEstate == 0) {
				retstring = retstring + '(' + ' EG ' + ')';
			} else {
				retstring = retstring + '(' + this.fromEstate.Flats[flatIndex].floorOfEstate + ' .OG ' + ')';
			}
		} else {
			retstring = this.estateService.getFlatTypeNameById(this.fromEstate.Flats[flatIndex].FlatTypeId) + ' ';
			if (this.fromEstate.Flats[flatIndex].floorOfEstate == 0) {
				retstring = retstring + '(' + ' EG ' + ')';
			} else {
				retstring = retstring + '(' + this.fromEstate.Flats[flatIndex].floorOfEstate + ' .OG ' + ')';
			}
		}
		return retstring;
	}

	public checkAndCreateEstates() {
		if (undefined === this.fromEstate.Flats) {
			this.fromEstate.Flats = [];
			// console.log(this.fromEstate.Flats);
		}

		const appartmentFlats: EstatesFlat[] = this.fromEstate.Flats.filter(
			(f: { FlatTypeId: any }) => f.FlatTypeId === FlatTypeEnum.Apartment
		);
		this.fromEstate.Flats = this.fromEstate.Flats.filter(
			(f: { FlatTypeId: any }) => f.FlatTypeId !== FlatTypeEnum.Apartment
		);

		while (this.fromEstate.numberOfFloors > appartmentFlats.length) {
			appartmentFlats[appartmentFlats.length] = new EstatesFlat(FlatTypeEnum.Apartment);
			appartmentFlats[appartmentFlats.length - 1].EstateTypeId =
				this.currentTransportation.FromEstate.EstateTypeId;
			appartmentFlats[appartmentFlats.length - 1].floorOfEstate = appartmentFlats.length - 1;
			this.decorateEstatesFlat(appartmentFlats[appartmentFlats.length - 1], FlatTypeEnum.Apartment);
		}

		while (this.fromEstate.numberOfFloors < appartmentFlats.length) {
			appartmentFlats.pop();
		}

		for (const myFlat of appartmentFlats) {
			this.fromEstate.Flats.push(myFlat);
		}

		if (this.fromEstate.hasLoft === false) {
			this.fromEstate.Flats = this.fromEstate.Flats.filter(
				(f: { FlatTypeId: any }) => f.FlatTypeId !== FlatTypeEnum.Loft
			);
		} else {
			this.checkAndCreateOuterPart(FlatTypeEnum.Loft, this.fromEstate.loftFloor, this.fromEstate.loftSqMt);
		}

		if (this.fromEstate.hasGardenGarage === false) {
			this.fromEstate.Flats = this.fromEstate.Flats.filter(
				(f: { FlatTypeId: any }) => f.FlatTypeId !== FlatTypeEnum.GardenGarage
			);
		} else {
			this.checkAndCreateOuterPart(
				FlatTypeEnum.GardenGarage,
				this.fromEstate.gardenGarageFloor,
				this.fromEstate.gardenGarageSqMt
			);
		}

		if (this.fromEstate.hasCellar === false) {
			this.fromEstate.Flats = this.fromEstate.Flats.filter(
				(f: { FlatTypeId: any }) => f.FlatTypeId !== FlatTypeEnum.Cellar
			);
		} else {
			this.checkAndCreateOuterPart(FlatTypeEnum.Cellar, this.fromEstate.cellarFloor, this.fromEstate.cellarSqMt);
		}
	}

	public decorateEstatesFlat(argEstatesFlat: EstatesFlat, argFlatTypeEnum: FlatTypeEnum) {
		let mainEstateTypeEPartTypeList: EstateTypeEPartType[];

		mainEstateTypeEPartTypeList = this.estateService
			.getEstateTypeEPartTypeList()
			.filter((ept: any) => ept.estateTypeId === this.fromEstate.EstateTypeId)
			.sort((a: { sequenceNumber: any }) => a.sequenceNumber);

		if (argFlatTypeEnum === FlatTypeEnum.Apartment) {
			for (const rEstateParts of mainEstateTypeEPartTypeList) {
				if (
					null ==
						argEstatesFlat.EstateParts.find(
							(p: EstatePart) => p.estatePartTypeId === rEstateParts.estatePartTypeId
						) &&
					this.estateService
						.getEstatePartTypeList()
						.find((p: EstatePartType) => p.id === rEstateParts.estatePartTypeId).isOuterPart === false
				) {
					argEstatesFlat.EstateParts.push(this.generateDecoratedEstatePart(rEstateParts.estatePartTypeId));
				}
			}
		} else if (argFlatTypeEnum === FlatTypeEnum.Cellar) {
			argEstatesFlat.EstateParts.push(this.generateDecoratedEstatePart(EstatePartTypeEnum.Cellar));
		} else if (argFlatTypeEnum === FlatTypeEnum.Loft) {
			argEstatesFlat.EstateParts.push(this.generateDecoratedEstatePart(EstatePartTypeEnum.Loft));
		} else if (argFlatTypeEnum === FlatTypeEnum.GardenGarage) {
			argEstatesFlat.EstateParts.push(this.generateDecoratedEstatePart(EstatePartTypeEnum.GardenGarage));
		}
	}

	public generateDecoratedEstatePart(estatePartTypeId: number): EstatePart {
		const lclEstatePart: EstatePart = new EstatePart();

		lclEstatePart.estatePartTypeId = estatePartTypeId;
		lclEstatePart.estatePartType = this.estatePartTypeList.find((p) => p.id === estatePartTypeId);
		this.decorateEstatePart(lclEstatePart);

		return lclEstatePart;
	}

	public decorateEstatePart(argEstatePart: EstatePart) {
		const mainEPartTypeFrnGrpTypeList: EPartTypeFrnGrpType[] = this.estateService
			.getEPartTypeFrnGrpTypeList()
			.filter((ept: { estatePartTypeId: any }) => ept.estatePartTypeId === argEstatePart.estatePartTypeId)
			.sort((a: { sequenceNumber: any }) => a.sequenceNumber);

		argEstatePart.numberOfFurnitures = 0;
		argEstatePart.volumeOfFurnitures = 0;

		for (const rEPartTypeFrnGrpType of mainEPartTypeFrnGrpTypeList) {
			/*
			let furnitureTypeList = this.estateService.getFurnitureTypeList()
				.filter(x=> x.furnitureGroupTypeId==rEPartTypeFrnGrpType.furnitureGroupTypeId);
			*/
			const furnitureTypeList = this.estateService.getFurnitureTypeList();

			for (const furnitureType of furnitureTypeList) {
				if (
					null ==
					argEstatePart.furnitures.find(
						(p: { FurnitureTypeId: any }) => p.FurnitureTypeId === furnitureType.id
					)
				) {
					argEstatePart.furnitures.push(this.generateDecoratedFurniture(furnitureType.id));
				}
			}

			for (const furniture of argEstatePart.furnitures) {
				argEstatePart.numberOfFurnitures += furniture.NumberOfFurnitures;
				argEstatePart.volumeOfFurnitures += furniture.FurnitureType.volume * furniture.NumberOfFurnitures;
			}
			argEstatePart.mainFurnitureGroupList = this.estateService.getFrnGrpTypeListByEPartTypeId(
				argEstatePart.estatePartTypeId
			);
			argEstatePart.secondaryFurnitureGroupList = this.estateService.getNotInFrnGrpTypeListByEPartTypeId(
				argEstatePart.estatePartTypeId
			);
		}
	}

	public generateDecoratedFurniture(argFurnitureTypeId: number): Furniture {
		const lclFurniture: Furniture = new Furniture();
		lclFurniture.FurnitureTypeId = argFurnitureTypeId;
		lclFurniture.FurnitureType = this.estateService
			.getFurnitureTypeList()
			.find((p: { id: number }) => p.id === argFurnitureTypeId);
		lclFurniture.NumberOfFurnitures = 0;

		return lclFurniture;
	}

	openDialog(): void {
		console.log('here');
		const dialogRef = this.dialog.open(TfSubmitDialogComponent, {
			width: '300px',
			data: { OkPressed: false, currentDemand: this.currentDemand },
		});

		dialogRef.afterClosed().subscribe((result) => {
			// console.log('The third from submit dialog was closed result:' + result);
			if (result === true) {
				this.currentTransportation.IsFixedPrice = true;
				this.currentTransportation.ExtraInfoLanguageId = this.estateService.getCurrentLnguageId();
				this.demandgwService.createTransportationDemand(this.currentDemand, this.currentTransportation);
				this.router.navigateByUrl('/transportation');
			}
		});
	}

	frnGrpFrnList(argEstatePart: EstatePart, argFurnitureGroup: FurnitureGroupType) {
		const dialogRef = this.dialog.open(FrngrpFormComponent, {
			width: '40%',
			data: { estatePart: argEstatePart, furnitureGroup: argFurnitureGroup },
		});

		dialogRef.afterClosed().subscribe((result) => {
			// console.log('The third from submit dialog was closed result:' + result);
			if (result === true) {
			}
		});
	}

	private checkAndCreateOuterPart(argFlatTypeEnum: FlatTypeEnum, argFloor: number, argSqMt: number) {
		let lclEstatesFlat: EstatesFlat;

		lclEstatesFlat = this.fromEstate.Flats.filter((f: { FlatTypeId: any }) => f.FlatTypeId === argFlatTypeEnum)[0];
		if (null == lclEstatesFlat) {
			lclEstatesFlat = new EstatesFlat(argFlatTypeEnum);
			this.decorateEstatesFlat(lclEstatesFlat, argFlatTypeEnum);
			this.fromEstate.Flats.push(lclEstatesFlat);
		}

		lclEstatesFlat.floorOfEstate = argFloor;
		lclEstatesFlat.sqMtOfFloor = argSqMt;
	}

	public calculateCost(): void {
		const dialogRef = this.dialog.open(CostinfoFormComponent, {
			data: {},
		});
	}

	public estatePartRadioChange(event: MatRadioChange) {
		this.selectedEstatePart = this.fromEstate.Flats[this.selectedFloor].EstateParts[event.value];
		// debugger;
		var s: string = 'll';
	}
}
