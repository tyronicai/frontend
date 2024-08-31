import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstatePart } from '@app/models/EstateModels/estatePart.model';
import { FurnitureGroupType } from '@app/models/EstateModels/furnitureGroupType.model';
import { EstateService } from '@app/services/estate/estate.service';
import { Furniture } from '@app/models/EstateModels/furniture.model';

@Component({
	selector: 'app-frngrp-form',
	templateUrl: './frngrp-form.component.html',
	styleUrls: ['./frngrp-form.component.scss'],
})
export class FrngrpFormComponent implements OnInit {
	estatePart: EstatePart;
	furnitureGroup: FurnitureGroupType;

	constructor(
		public estateService: EstateService,
		public dialogRef: MatDialogRef<FrngrpFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.estatePart = data.estatePart;
		this.furnitureGroup = data.furnitureGroup;
		// console.log(this.estatePart);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit() {}

	public ChangeNumberOfFurnitures(increment: number, furniture: Furniture) {
		furniture.NumberOfFurnitures += increment;
		if (furniture.NumberOfFurnitures < 0) {
			furniture.NumberOfFurnitures = 0;
		} else {
			this.estatePart.numberOfFurnitures += increment;
			this.estatePart.volumeOfFurnitures += furniture.FurnitureType.volume * increment;
		}
	}
}
