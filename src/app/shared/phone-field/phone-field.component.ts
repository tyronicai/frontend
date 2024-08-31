import { Component, OnInit, DoCheck } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

// services
import { CountryService } from '@app/services/country/country.service';
import { DemandService } from '@app/services/demand/demand.service';

//models
import { Transportation } from '@app/models/TransportationModels/Transportation.model';
import { Demand } from '@app/models/DemandModels/Demand.model';
import { CountryList } from '@app/models/coreModels/countryList.model';

@Component({
	selector: 'app-phone-field',
	templateUrl: './phone-field.component.html',
	styleUrls: ['./phone-field.component.scss'],
})
export class PhoneFieldComponent implements OnInit, DoCheck {
	currentDemand: Demand;

	countryPhoneCodes: CountryList[];
	filteredOptions: Observable<CountryList[]>;
	myControl = new FormControl();

	constructor(public countryService: CountryService, public demandService: DemandService) {}

	ngOnInit() {
		this.currentDemand = this.demandService.getCurrentDemand();

		this.filteredOptions = this.myControl.valueChanges.pipe(
			startWith(' '),
			map((value) => (typeof value === 'string' ? value : value.countryPhoneCodes)),
			map((code) => (code ? this._filter(code.countryPhoneCodes) : this.countryPhoneCodes.slice()))
		);
	}

	displayFn(code?: CountryList): any | undefined {
		const codeWithPlus = '+' + code;
		return codeWithPlus ? codeWithPlus : undefined;
	}

	ngDoCheck() {
		this.getCountryPhoneCodeList();
	}

	getCountryPhoneCodeList() {
		this.countryPhoneCodes = this.countryService.getCountryList;
		// console.log(this.countryPhoneCodes);
	}

	private _filter(code: string): CountryList[] {
		// console.log(code);
		return this.countryPhoneCodes.filter((option) => option.countryCode.indexOf(code) === 0);
	}
}
