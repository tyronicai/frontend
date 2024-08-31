import { FormControl, FormGroup } from '@angular/forms';

export class PasswordValidator {
	static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
		return (group: FormGroup): { [key: string]: any } => {
			let password = group.controls[passwordKey];
			let confirmPassword = group.controls[confirmPasswordKey];

			if (password.value !== confirmPassword.value) {
				return {
					mismatchedPasswords: true,
				};
			}
		};
	}

	static areEqual(formGroup: FormGroup) {
		let val;
		let valid = true;

		for (let key in formGroup.controls) {
			if (formGroup.controls.hasOwnProperty(key)) {
				let control: FormControl = <FormControl>formGroup.controls[key];
				if (val === undefined) {
					val = control.value;
				} else {
					if (val !== control.value) {
						valid = false;
						break;
					}
				}
			}
		}
		if (valid) {
			return null;
		}
		return {
			areEqual: true,
		};
	}
}
