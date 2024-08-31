import { Component, OnInit, Input, Inject } from '@angular/core';
import { TransportationService } from '@app/services/transportation/transportation.service';
import { Transportation } from '@app/models/TransportationModels/Transportation.model';
import { Estate } from '@app/models/EstateModels/estate.model';
import { EstateService } from '@app/services/estate/estate.service';
import { TransCalRes } from '@app/models/TransportationModels/TransCalRes.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-costinfo-form',
	templateUrl: './costinfo-form.component.html',
	styleUrls: ['./costinfo-form.component.css'],
})
export class CostinfoFormComponent implements OnInit {
	currentTransportation: Transportation;
	//@Input()
	fromEstate: Estate;
	//@Input()
	toEstate: Estate;
	constructor(
		public transportationService: TransportationService,
		public estateService: EstateService,
		public dialogRef: MatDialogRef<CostinfoFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: {}
	) {}

	ngOnInit(): void {
		this.currentTransportation = this.transportationService.getCurrentTransportation();
		this.fromEstate = this.currentTransportation.FromEstate;
		this.toEstate = this.currentTransportation.ToEstate;
	}

	public getLaborCost(): string {
		let transCalRes: TransCalRes = this.transportationService.getTransCalRes();
		if (undefined == transCalRes) {
			return '';
		}
		return (transCalRes?.laborLoadCost + transCalRes?.laborUnloadCost).toFixed(2);
	}

	public getFareCost(): string {
		let transCalRes: TransCalRes = this.transportationService.getTransCalRes();
		if (undefined == transCalRes) {
			return '';
		}
		return this.transportationService.getTransCalRes()?.fareCost.toFixed(2);
	}

	public getTotalCost(): string {
		let transCalRes: TransCalRes = this.transportationService.getTransCalRes();
		if (undefined == transCalRes) {
			return '';
		}
		return (transCalRes?.laborLoadCost + transCalRes?.laborUnloadCost + transCalRes?.fareCost).toFixed(2);
	}

	public getLoadDuration(): string {
		let transCalRes: TransCalRes = this.transportationService.getTransCalRes();
		if (undefined == transCalRes) {
			return '';
		}

		return (
			'Day:' + transCalRes?.loadDay + ', Hour:' + transCalRes?.loadHour + ', Minute:' + transCalRes?.loadMinute
		);
	}

	public getUnloadDuration(): string {
		let transCalRes: TransCalRes = this.transportationService.getTransCalRes();
		if (undefined == transCalRes) {
			return '';
		}

		return (
			'Day:' +
			transCalRes?.unloadDay +
			', Hour:' +
			transCalRes?.unloadHour +
			', Minute:' +
			transCalRes?.unloadMinute
		);
	}

	closeDialog(): void {
		// Close the dialog, return false
		this.dialogRef.close(false);
	}
}
