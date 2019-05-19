import { FormGroup } from '@angular/forms';

// custom validator to check that user not found
export function UserNotFound(userNotFound: Array<string>, emailName: string) {
  return (formGroup: FormGroup) => {
    const emailControl = formGroup.controls[emailName];

    if (emailControl.errors) {
      // return if another validator has already found an error on the emailControl
      return;
    }

    if (userNotFound.indexOf(emailControl.value) > -1) {
      emailControl.setErrors({ userNotFound: true });
    } else {
      emailControl.setErrors(null);
    }
    return null;
  };
}
