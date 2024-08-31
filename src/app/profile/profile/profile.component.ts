import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { UserService } from '@app/services/user/user.service';
import { User } from '@app/models/AccountModels/Account.model';

import { MatSnackBar } from '@angular/material/snack-bar';
import { PasswordValidator } from '@app/core/utils/PasswordValidator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from '@app/services/account/account.service';
import { UpdateAccountRequestModel } from '@app/models/RequestModels/UpdateAccountRequestModel';
import { ChangePasswordRequestModel } from '@app/models/RequestModels/ChangePasswordRequestModel';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	account: User;
	error: string | undefined;
	public registerForm!: FormGroup;
	public onPasswordForm: FormGroup;
	isLoading = false;
	editable: boolean = true;
	selectedPage: number = 1;

	constructor(
		private _formBuilder: FormBuilder,
		public userService: UserService,
		public accountService: AccountService,
		private formBuilder: FormBuilder,
		public snackBar: MatSnackBar,
		public dialog: MatDialog
	) {
		this.userService.currentUser.subscribe((user: User) => {
			this.account = user;
		});
		this.account.password = '';
	}

	ngOnInit() {
		this.createForm();
		this.passwordForm();
	}

	editAccount() {
		this.editable = !this.editable;
	}

	cancel() {
		this.editable = !this.editable;
	}

	updateAccount() {
		this.isLoading = true;
		var updateAccountRequestModel = new UpdateAccountRequestModel();
		updateAccountRequestModel.Email = this.account.email;
		updateAccountRequestModel.FirstName = this.account.firstName;
		updateAccountRequestModel.LastName = this.account.lastName;
		updateAccountRequestModel.PhoneNumber = this.account.phoneNumber;

		this.accountService.updateAccount(updateAccountRequestModel).then(
			(response) => {
				this.isLoading = false;
				this.editable = !this.editable;
				this.snackBar.open('Account updated', 'x', {
					duration: 2000,
					horizontalPosition: 'right',
					verticalPosition: 'top',
				});
			},
			(error) => {
				this.isLoading = false;
			}
		);
	}

	changePassword() {
		this.isLoading = true;
		const data = {
			Account: this.account,
			NewPassword: this.onPasswordForm.get('newPassword').value,
		};

		var changePasswordRequestModel = new ChangePasswordRequestModel();
		changePasswordRequestModel.Account = this.account;
		changePasswordRequestModel.NewPassword = this.onPasswordForm.value.newPassword;
		this.accountService.changePassword(data).then(
			(response) => {
				this.isLoading = false;

				if (null == response) {
					this.snackBar.open('Password incorrect', 'x', {
						duration: 2000,
						horizontalPosition: 'right',
						verticalPosition: 'top',
					});
				} else {
					this.editable = !this.editable;
					this.snackBar.open('Password changed', 'x', {
						duration: 2000,
						horizontalPosition: 'right',
						verticalPosition: 'top',
					});
					this.onPasswordForm.get('password').clearValidators();
					this.onPasswordForm.get('newPassword').clearValidators();
					this.onPasswordForm.get('newPasswordConfirm').clearValidators();
					this.onPasswordForm.get('password').setValue('');
					this.onPasswordForm.get('newPassword').setValue('');
					this.onPasswordForm.get('newPasswordConfirm').setValue('');
				}
			},
			(error) => {
				this.isLoading = false;
			}
		);
	}

	selectedTab(tabId: any) {
		this.selectedPage = tabId;
	}

	resendEmailActivationMail(): void {
		const dialogRef = this.dialog.open(ResendMailDialogComponent, {
			width: '400px',
			height: '350px',
			position: {
				top: '10%',
				left: '40%',
			},
			data: { name: this.account.firstName, email: this.account.email },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
			}
			const acc = this.account;
			acc.email = result;
			this.resendActivationMail(acc);
		});
	}

	resendActivationMail(acc: User) {
		this.accountService.resendActivationMail(acc).then(
			(res) => {
				// console.log(res);
			},
			(err) => {
				// console.log(err);
			}
		);
	}
	private createForm() {
		this.registerForm = new FormGroup({
			firstname: new FormControl({ value: '', disabled: this.editable }),
			lastname: new FormControl({ value: '', disabled: this.editable }),
			email: new FormControl({ value: '', disabled: this.editable }),
			phone: new FormControl({ value: '', disabled: this.editable }),
		});
	}

	private passwordForm() {
		this.onPasswordForm = this.formBuilder.group(
			{
				password: [null, Validators.compose([Validators.required])],
				newPassword: [null, Validators.compose([Validators.required])],
				newPasswordConfirm: [null, Validators.compose([Validators.required])],
			},
			{ validators: PasswordValidator.matchingPasswords('newPassword', 'newPasswordConfirm') }
		);
	}
}

@Component({
	selector: 'resend-email-dialog',
	templateUrl: './resend-email-dialog.html',
})
export class ResendMailDialogComponent {
	constructor(public dialogRef: MatDialogRef<ResendMailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
		// console.log(data);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
