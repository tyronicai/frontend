import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

import { environment } from '@env/environment';
import { Logger, I18nService } from '@app/core';
import { AuthService } from '@app/services/auth/auth.service';
import { CountryService } from '@app/services/country/country.service';
import { EstateService } from '@app/services/estate/estate.service';
import { AlertService } from 'ngx-alerts';
import { Account } from '@app/models/AccountModels/Account.model';

const log = new Logger('Register');

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	version: string | null = environment.version;
	error: string | undefined;
	registerForm!: FormGroup;
	isLoading = false;
	fromTransportation = false;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private i18nService: I18nService,
		private authenticationService: AuthService,
		public countryService: CountryService,
		public estateService: EstateService,
		public snackBar: MatSnackBar,
		public location: Location,
		private alertService: AlertService
	) {
		const navigation = this.router.getCurrentNavigation();
		const state = navigation.extras.state as {
			fromTransportationForm: boolean;
		};
		if (undefined !== state && state.fromTransportationForm) {
			this.fromTransportation = true;
		}
		this.createForm();
	}

	ngOnInit() {}

	register() {
		if (this.registerForm.value.password.length < 6) {
			this.alertService.warning('Şifre en az 6 karakter olmalıdır.');
		} else {
			this.isLoading = true;
			var account = new Account();
			account.password = this.registerForm.value.password;
			account.firstName = this.registerForm.value.firstname;
			account.lastName = this.registerForm.value.lastname;
			account.username = account.firstName + '' + account.lastName;
			account.email = this.registerForm.value.email;
			account.phoneNumber = this.registerForm.value.phone;
			this.authenticationService.register(account).subscribe(
				(res: any) => {
					console.log(res);
					// console.log(res['isValid']);
					if (res.isValid !== true) {
						this.isLoading = false;
						this.alertService.warning(res.description);
					} else {
						this.authenticationService
							.login(this.registerForm.value.email, this.registerForm.value.password)
							.subscribe(
								(resp: any) => {
									if (resp.isValid) {
										if (this.fromTransportation) {
											this.router.navigate(['transportation/components']);
										} else {
											this.router.navigate(
												[this.route.snapshot.queryParams.redirect || '/transportation'],
												{
													replaceUrl: true,
												}
											);
										}
										// this.location.back();
									}
								},
								(err: any) => {
									console.log(err);
								}
							);
					}
				},
				(err: any) => {
					log.debug(`Register error: ${err}`);
					this.error = err;
				}
			);
		}
	}

	setLanguage(language: string) {
		this.i18nService.language = language;
	}

	get currentLanguage(): string {
		return this.i18nService.language;
	}

	get languages(): string[] {
		return this.i18nService.supportedLanguages;
	}

	public openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

	private createForm() {
		this.registerForm = this.formBuilder.group({
			password: ['', Validators.required],
			firstname: ['', Validators.required],
			lastname: ['', Validators.required],
			email: ['', Validators.required],
			phone: ['', Validators.required],
			remember: true,
		});
	}
}
