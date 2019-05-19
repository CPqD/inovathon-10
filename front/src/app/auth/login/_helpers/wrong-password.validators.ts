import { FormGroup } from '@angular/forms';

// custom validator to check that is a wrong password
export function WrongPassword(wrongPassword: { [email: string]: Array<string> }, emailName: string, passwordName: string) {
  return (formGroup: FormGroup) => {
    const emailControl = formGroup.controls[emailName];
    const passwordControl = formGroup.controls[passwordName];

    if (passwordControl.errors) {
      // return if another validator has already found an error on the passwordControl
      return;
    }

    if ((wrongPassword[emailControl.value] || []).indexOf(passwordControl.value) > -1) {
      passwordControl.setErrors({ wrongPassword: true });
    } else {
      passwordControl.setErrors(null);
    }
    return null;
  };
}
