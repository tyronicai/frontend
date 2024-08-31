import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EstateService } from '@app/services/estate/estate.service';
import { Router } from '@angular/router';
import { I18nService, TransportationService } from '@app/core';
import { CountryService } from '@app/services/country/country.service';
import { PostCodeData } from '@app/models/coreModels/PostCodeData.model';
import { FormControl, Validators } from '@angular/forms';

import { map, startWith, finalize, catchError } from 'rxjs/operators';

//models
import { EstateType } from '@app/models/EstateModels/estateType.model';
import { CountryList } from '@app/models/coreModels/countryList.model';
import { Transportation } from '@app/models/TransportationModels/Transportation.model';
import { OAKLanguage } from '@app/models/coreModels/oakLanguage.model';
import { GenericAddress } from '@app/models/AddressModels/GenericAddress.model';

@Component({
	selector: 'app-address-form',
	templateUrl: './address-form.component.html',
	styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
	@Input() address: GenericAddress;
	@Input() header: string;

	postCodes: PostCodeData[] = [];
	placeNames: PostCodeData[] = [];
	countryId: number;
	disabled: boolean = true;

	streetFormControl = new FormControl('', [Validators.required]);
	houseNumberFormControl = new FormControl('', [Validators.required]);
	postCodeCtl = new FormControl('', [Validators.required]);
	placeNameCtl = new FormControl('', [Validators.required]);

	constructor(
		private router: Router,
		public estateService: EstateService,
		private i18nService: I18nService,
		private transportationService: TransportationService,
		public countryService: CountryService
	) {}

	ngOnInit() {
		this.postCodeCtl.setValue(this.address.PostCode);
		this.placeNameCtl.setValue(this.address.PlaceName);
	}

	getAddressPostList() {
		if (this.address.PostCode != this.postCodeCtl.value) {
			this.address.PostCode = this.postCodeCtl.value;
			if (null != this.address.PostCode) {
				if (this.address.PostCode.length >= 2 && this.address.PostCode.length < 5) {
					this.countryService
						.postPostCodeDataListByCountryIdAndPostCode(this.address.CountryId, this.address.PostCode)
						.subscribe(
							(a: PostCodeData[]) => {
								this.postCodes = a;
							},
							(error) => {
								// console.log('getAddressPostList : ' + JSON.stringify(error));
							}
						);
				}
			}
		}
		return this.postCodes;
	}

	getAddressPlaceList() {
		if (this.address.PlaceName != this.placeNameCtl.value) {
			this.address.PlaceName = this.placeNameCtl.value;
			if (null != this.address.PlaceName) {
				if (this.address.PlaceName.length >= 3) {
					this.countryService
						.postPostCodeDataListByCountryIdAndPlaceName(this.address.CountryId, this.address.PlaceName)
						.subscribe(
							(a: PostCodeData[]) => {
								this.placeNames = a;
							},
							(error) => {
								// console.log('getddressPostList : ' + JSON.stringify(error));
							}
						);
				}
			}
		}
		return this.placeNames;
	}

	postCodeOptionSelected(argPostCodeData: PostCodeData) {
		this.address.PlaceName = argPostCodeData.placeName;
		this.address.PostCode = argPostCodeData.postCode;
		this.placeNameCtl.setValue(argPostCodeData.placeName);
		this.postCodeCtl.setValue(argPostCodeData.postCode);
	}

	placeNameOptionSelected(argPostCodeData: PostCodeData) {
		this.postCodeOptionSelected(argPostCodeData);
	}

	getStreet(event: any) {
		this.address.Street = event;
	}

	getHomeNumber(event: any) {
		this.address.HouseNumber = event;
	}

	ngDoCheck() {
		//this.checkValidation();
	}

	checkValidation(): Boolean {
		if (
			this.streetFormControl.valid &&
			this.houseNumberFormControl.valid &&
			this.postCodeCtl.valid &&
			this.placeNameCtl.valid
		) {
			return true;
		}
		this.streetFormControl.markAllAsTouched();
		this.houseNumberFormControl.markAllAsTouched();
		this.postCodeCtl.markAllAsTouched();
		this.placeNameCtl.markAllAsTouched();
	}
}
