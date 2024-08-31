import { i18nMetaToDocStmt } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '@app/core';
import { AccountService } from '@app/services/account/account.service';
import { environment } from '@env/environment';
import { LangChangeEvent } from '@ngx-translate/core';
import { AlertService } from 'ngx-alerts';
import { PasswordMatchValidator } from '../directive/password-match.directive';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
	version: string | null = environment.version;
	error: string | undefined;
	isLoading = false;
	fromTransportation = false;
	token: string;
	language: string;

	resetPasswordForm = this.formBuilder.group(
		{
			newPwd: ['', Validators.required],
			reNewPwd: ['', Validators.required],
		},
		{ validator: PasswordMatchValidator }
	);

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private i18n: I18nService,
		private accountService: AccountService,
		private alertService: AlertService
	) {
		var tokenStartIdx = window.location.href.indexOf('?token=') + '?token='.length;
		var tokenEndIdx = window.location.href.indexOf('&culture=');
		this.token = window.location.href.slice(tokenStartIdx, tokenEndIdx);
		this.language = window.location.href.slice(tokenEndIdx + '&culture='.length);
		console.log('token=' + this.token);
		console.log('language=' + this.language);
		i18n.language = this.language;
	}

	ngOnInit(): void {
		console.log('ResetPassword:' + window.location.href);
	}

	resetPassword() {
		this.accountService
			.resetPassword(
				this.resetPasswordForm.get('newPwd').value,
				this.resetPasswordForm.get('reNewPwd').value,
				this.token
			)
			.subscribe(
				(res) => {
					this.router.navigate(['/transportation']);
				},
				(error) => {
					this.alertService.warning('Hatalı Token');
				}
			);
	}
}
