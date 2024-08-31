import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransportationService } from '@app/services/transportation/transportation.service';
import { EstateService } from '@app/services/estate/estate.service';
import { I18nService } from '@app/core/i18n.service';
import { Transportation } from '@app/models/TransportationModels/Transportation.model';
import { Estate } from '@app/models/EstateModels/estate.model';
import { EstatesFlat } from '@app/models/EstateModels/estatesFlat.model';

@Component({
	selector: 'app-estate-outerpart-form',
	templateUrl: './estate-outerpart-form.component.html',
	styleUrls: ['./estate-outerpart-form.component.scss'],
})
export class EstateOuterpartFormComponent implements OnInit {
	currentTransportation: Transportation;
	fromEstate: Estate;
	toEstate: Estate;
	loftFlat: EstatesFlat = null;
	cellarFlat: EstatesFlat = null;
	gartenGarageFlat: EstatesFlat = null;

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

	goToEstateReqServiceForm() {
		let validationFlag: Boolean = true;
		/*
    for (var myChild of this.children) {
      validationFlag = myChild.checkValidation() && validationFlag;
    }
    */
		if (validationFlag) {
			this.router.navigateByUrl('/transportation/estate-reqservice-form');
		} else {
			console.log('else work');
		}
	}
}
