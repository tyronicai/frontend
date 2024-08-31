import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const PasswordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
	const newPwd = control.get('newPwd');
	const reNewPwd = control.get('reNewPwd');

	return newPwd && reNewPwd && reNewPwd.value === newPwd.value ? null : { passwordsDontMatch: true };
};
