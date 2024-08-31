import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-login-or-register',
	templateUrl: './login-or-register.component.html',
	styleUrls: ['./login-or-register.component.scss'],
})
export class LoginOrRegisterComponent implements OnInit {
	constructor(
		public router: Router,
		public dialogRef: MatDialogRef<LoginOrRegisterComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit() {}

	goToLoginForm() {
		this.router.navigate(['login'], { state: { fromTransportationForm: true } });
		// console.log('goToLoginForm');
		this.dialogRef.close();
	}

	goToRegisterForm() {
		this.router.navigate(['login/register'], { state: { fromTransportationForm: true } });
		// console.log('goToRegisterForm');
		this.dialogRef.close();
	}
}
