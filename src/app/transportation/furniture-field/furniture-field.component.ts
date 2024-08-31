import { Component, OnInit, Input } from '@angular/core';

import { Furniture } from '@app/models/EstateModels/furniture.model';
import { EstateService } from '@app/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export class Notifier {
	valueChanged: (data: boolean) => void = (d: boolean) => {};
}

@Component({
	selector: 'app-furniture-field',
	templateUrl: './furniture-field.component.html',
	styleUrls: ['./furniture-field.component.scss'],
})
export class FurnitureFieldComponent implements OnInit {
	@Input() furniture: Furniture;
	@Input() maxFloor: number;
	@Input() notifier = new Notifier();
	furnitures: Furniture[] = [];

	review_btn = false;
	constructor(public estateService: EstateService, public _snackBar: MatSnackBar) {}

	ngOnInit() {
		// console.log(this.furniture);

		this.notifier.valueChanged = (d: boolean) => {
			// console.log(d);
			// console.log(this.furnitures);

			this.review_btn = d;
			if (this.furniture.NumberOfFurnitures > 0) {
				// console.log(this.furniture);

				this.furnitures.push(this.furniture);
			}
		};
	}

	public ChangeNumberOfFurnitures(increment: number) {
		this.review_btn = false;
		this.furniture.NumberOfFurnitures += increment;
		if (this.furniture.NumberOfFurnitures < 0) {
			this.furniture.NumberOfFurnitures = 0;
		}
	}

	reviewCreate(furniture: Furniture) {
		this.review_btn = true;
		// console.log(furniture);

		this._snackBar.open(furniture + '  ✔', '✕', {
			duration: 1500,
		});
	}
}
