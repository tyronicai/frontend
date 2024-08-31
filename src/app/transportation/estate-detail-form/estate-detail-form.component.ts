import { Component, OnInit, AfterViewInit, ViewChildren, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

//Services
import { TransportationService } from '@app/services/transportation/transportation.service';
import { CountryService } from '@app/services/country/country.service';

//models
import { Transportation } from '@app/models/TransportationModels/Transportation.model';
import { PostCodeData } from '@app/models/coreModels/PostCodeData.model';

// child comp
import { AddressFormComponent } from '../address-form/address-form.component';
import { CostinfoFormComponent } from '../costinfo-form/costinfo-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-estate-detail-form',
	templateUrl: './estate-detail-form.component.html',
	styleUrls: ['./estate-detail-form.component.scss'],
})
export class EstateDetailFormComponent implements OnInit, AfterViewInit {
	currentTransportation: Transportation;

	constructor(
		private router: Router,
		private transportationService: TransportationService,
		public confirmDialog: MatDialog,
		private countryService: CountryService
	) {}

	ngOnInit() {
		this.currentTransportation = this.transportationService.getCurrentTransportation();
	}

	ngAfterViewInit() {}

	goToEstateOuterPartForm() {
		this.router.navigateByUrl('/transportation/estate-outerpart-form');
	}

	public calculateCost(): void {
		const dialogRef = this.confirmDialog.open(CostinfoFormComponent, {
			data: {},
		});
	}
}
