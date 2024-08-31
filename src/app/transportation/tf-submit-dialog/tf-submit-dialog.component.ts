import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Demand } from '@app/models/DemandModels/Demand.model';
export interface DialogData {
	OkPressed: boolean;
	currentDemand: Demand;
}

@Component({
	selector: 'app-tf-submit-dialog',
	templateUrl: './tf-submit-dialog.component.html',
	styleUrls: ['./tf-submit-dialog.component.scss'],
})
export class TfSubmitDialogComponent {
	fullname: String;

	constructor(public dialogRef: MatDialogRef<TfSubmitDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
