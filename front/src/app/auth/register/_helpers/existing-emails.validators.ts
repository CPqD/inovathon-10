import { FormGroup } from '@angular/forms';

// custom validator to check that existing email
export function ExistingEmails(existingEmails: Array<string>, emailName: string) {
  return (formGroup: FormGroup) => {
    const emailControl = formGroup.controls[emailName];

    if (emailControl.errors) {
      // return if another validator has already found an error on the emailControl
      return;
    }

    if (existingEmails.indexOf(emailControl.value) > -1) {
      emailControl.setErrors({ existingEmails: true });
    } else {
      emailControl.setErrors(null);
    }
    return null;
  };
}
