import { Component, OnInit, ViewChildren } from '@angular/core';
import { AddressFormComponent } from '../address-form/address-form.component';
import { Router } from '@angular/router';
import { EstateService, TransportationService, I18nService } from '@app/core';
import { Transportation } from '@app/models/TransportationModels/Transportation.model';
import { Estate } from '@app/models/EstateModels/estate.model';

@Component({
	selector: 'app-estate-reqservice-form',
	templateUrl: './estate-reqservice-form.component.html',
	styleUrls: ['./estate-reqservice-form.component.scss'],
})
export class EstateReqserviceFormComponent implements OnInit {
	@ViewChildren(AddressFormComponent) children: AddressFormComponent[];

	currentTransportation: Transportation;
	fromEstate: Estate;
	toEstate: Estate;

	constructor(
		private router: Router,
		public estateService: EstateService,
		private transportationService: TransportationService,
		private i18nService: I18nService
	) {}

	ngOnInit() {
		if (!this.estateService.isEstateMetaDataFetched()) {
			this.router.navigateByUrl('/transportation');
		}
		this.currentTransportation = this.transportationService.getCurrentTransportation();
		this.fromEstate = this.currentTransportation.FromEstate;
		this.toEstate = this.currentTransportation.ToEstate;
	}

	goToDateForm() {
		let validationFlag = true;
		for (const myChild of this.children) {
			validationFlag = myChild.checkValidation() && validationFlag;
		}
		if (validationFlag) {
			this.router.navigateByUrl('/transportation/date-form');
		} else {
			// console.log('else work');
		}
	}
}
