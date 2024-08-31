import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

import { environment } from '@env/environment';
import { Logger, I18nService, untilDestroyed } from '@app/core';
import { AuthService } from '@app/services/auth/auth.service';
import { CountryService } from '@app/services/country/country.service';
import { AccountService } from '@app/services/account/account.service';
import { EstateService } from '@app/services/estate/estate.service';
import { AlertService } from 'ngx-alerts';
import { ForgotPassword } from '@app/models/AccountModels/ForgotPassword.model';

const log = new Logger('ForgotPassword');

@Component({
	selector: 'app-forgotPassword',
	templateUrl: './forgotPassword.component.html',
	styleUrls: ['./forgotPassword.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
	version: string | null = environment.version;
	error: string | undefined;
	ForgotPasswordForm!: FormGroup;
	isLoading = false;
	fromTransportation = false;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private i18nService: I18nService,
		private authService: AuthService,
		private titleService: Title,
		private AccountService: AccountService,
		public countryService: CountryService,
		public estateService: EstateService,
		public snackBar: MatSnackBar,
		public location: Location,
		private alertService: AlertService
	) {
		const navigation = this.router.getCurrentNavigation();

		this.createForm();
	}

	ngOnInit() {}

	forgotPassword() {
		if (this.ForgotPasswordForm.value.email.length < 3) {
			this.alertService.warning('email');
		} else {
			this.isLoading = true;
			let forgotPasswordMdl = new ForgotPassword();
			forgotPasswordMdl.Email = this.ForgotPasswordForm.value.email;
			debugger;
			this.AccountService.sendForgotPasswordMail(forgotPasswordMdl).then(
				(resp: any) => {
					if (resp.isValid) {
						if (this.fromTransportation) {
							this.router.navigate(['transportation/components']);
						} else {
							this.router.navigate([this.route.snapshot.queryParams.redirect || '/transportation'], {
								replaceUrl: true,
							});
						}
						this.location.back();
					}
				},
				(err: any) => {
					console.log(err);
					this.isLoading = false;
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
		this.ForgotPasswordForm = this.formBuilder.group({
			email: ['', Validators.required],
		});
	}
}
