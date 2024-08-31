import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { environment } from '@env/environment';
import { Logger, I18nService } from '@app/core';
import { AuthService } from '@app/services/auth/auth.service';
import { CountryService } from '@app/services/country/country.service';
import { EstateService } from '@app/services/estate/estate.service';
import { AlertService } from 'ngx-alerts';

const log = new Logger('Login');

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	version: string | null = environment.version;
	error: string | undefined;
	loginForm!: FormGroup;
	isLoading = false;
	fromTransportation = false;
	loginPressed = false;
	forgotPasswordPressed = false;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private i18nService: I18nService,
		private authenticationService: AuthService,
		private titleService: Title,

		public countryService: CountryService,
		public estateService: EstateService,
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

	ngOnDestroy() {}

	login() {
		this.isLoading = true;
		// console.log(this.loginForm.value);

		if (this.forgotPasswordPressed == true) {
			this.router.navigate(['login/forgotPassword'], {});
			this.isLoading = false;
		} else {
			this.authenticationService.login(this.loginForm.value['email'], this.loginForm.value['password']).subscribe(
				(res: any) => {
					if (res.isValid) {
						// log.debug(`${res.account.Email} successfully logged in`);
						if (this.fromTransportation) {
							this.router.navigate(['transportation/components']);
						} else {
							this.router.navigate([this.route.snapshot.queryParams.redirect || '/transportation'], {
								replaceUrl: true,
							});
						}
					} else {
						if (res.statusCode === 11) {
							this.alertService.danger('Hesap bulunamadı!');
						} else if (res.statusCode === 12) {
							this.alertService.danger('Email veya şifre yanlış!');
						} else {
							this.alertService.danger('Server kaynaklı hata!');
						}
						this.isLoading = false;
					}
				},
				(err: any) => {
					this.isLoading = false;
					this.alertService.danger('Server kaynaklı hata!');
					// log.debug(`Login error: ${err}`);
					this.error = err;
				}
			);
		}
	}

	setLanguage(language: string) {
		this.i18nService.language = language;
	}

	get currentLanguage(): string {
		debugger;
		return this.i18nService.language;
	}

	get languages(): string[] {
		return this.i18nService.supportedLanguages;
	}

	onLoginPressed() {
		this.loginPressed = true;
	}

	onForgotPasswordPressed() {
		this.forgotPasswordPressed = true;
	}

	private createForm() {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
			remember: true,
		});
	}
}
