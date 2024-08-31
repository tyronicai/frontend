import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class ConfirmDialogModel {
	constructor(public title: string, public message: string, public confirm: string, public dismiss: string) {}
}

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
	title: string;
	message: string;
	confirm: string;
	dismiss: string;

	constructor(
		public dialogRef: MatDialogRef<ModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
	) {
		this.title = data.title;
		this.message = data.message;
		this.dismiss = data.dismiss;
		this.confirm = data.confirm;
	}

	ngOnInit() {}

	onConfirm(): void {
		// Close the dialog, return true
		this.dialogRef.close(true);
	}

	onDismiss(): void {
		// Close the dialog, return false
		this.dialogRef.close(false);
	}
}
