import { Component, OnInit, Input } from '@angular/core';
import { Estate } from '@app/models/EstateModels/estate.model';
import { EstateService } from '@app/core';
import { Transportation } from '@app/models/TransportationModels/Transportation.model';

@Component({
	selector: 'app-estate-form',
	templateUrl: './estate-form.component.html',
	styleUrls: ['./estate-form.component.scss'],
})
export class EstateFormComponent implements OnInit {
	@Input() currentEstate: Estate;
	@Input() currentTransportation: Transportation;
	@Input() fromEstateFlag: boolean;
	@Input() header: string;

	constructor(public estateService: EstateService) {}

	ngOnInit() {}

	ngDoCheck() {}

	changePersonValue(arg: number) {
		this.currentTransportation.NumberOfPeople += arg;
		if (this.currentTransportation.NumberOfPeople < 0) this.currentTransportation.NumberOfPeople = 0;
	}

	floorValue(arg: number) {
		this.currentEstate.floorOfEstate += arg;
		if (this.currentEstate.floorOfEstate < 0) this.currentEstate.floorOfEstate = 0;
	}
}
