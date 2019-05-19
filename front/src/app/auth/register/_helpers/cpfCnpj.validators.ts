import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function CpfCnpj(identificationNumberName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[identificationNumberName];

    if (control.errors && !control.errors.invalidCpf && !control.errors.invalidCnpj) {
      // return if another validator has already found an error on the control
      return;
    }

    // set error on control if validation fails
    if (control.value.length === 11 && !cpfValidator(control.value)) {
      control.setErrors({ invalidCpf: true });
    } else {
      if (control.value.length === 14 && !cnpjValidator(control.value)) {
        control.setErrors({ invalidCnpj: true });
      } else {
        control.setErrors(null);
      }
    }
    return null;
  };
}


function cpfValidator(value) {
  if (value === "00000000000" ||
    value === "11111111111" ||
    value === "22222222222" ||
    value === "33333333333" ||
    value === "44444444444" ||
    value === "55555555555" ||
    value === "66666666666" ||
    value === "77777777777" ||
    value === "88888888888" ||
    value === "99999999999") {
    return false;
  }
  // Valida 1o digito
  let add = 0;
  let i;
  for (i = 0; i < 9; ++i) {
    add += parseInt(value.charAt(i)) * (10 - i);
  }
  let rev = (10 * add) % 11;
  if (rev === 10) {
    rev = 0;
  }
  if (rev !== parseInt(value.charAt(9))) {
    return false;
  }
  // Valida 2o digito
  add = 0;
  for (i = 0; i < 10; ++i) {
    add += parseInt(value.charAt(i)) * (11 - i);
  }
  rev = (10 * add) % 11;
  if (rev === 10) {
    rev = 0;
  }
  if (rev !== parseInt(value.charAt(10))) {
    return false;
  }
  return true;
}


function cnpjValidator(value) {
  // Elimina CNPJs invalidos conhecidos
  if (value === "00000000000000" ||
    value === "11111111111111" ||
    value === "22222222222222" ||
    value === "33333333333333" ||
    value === "44444444444444" ||
    value === "55555555555555" ||
    value === "66666666666666" ||
    value === "77777777777777" ||
    value === "88888888888888" ||
    value === "99999999999999") {
    return false;
  }

  // Valida DVs
  let tamanho = value.length - 2;
  let add = 0;
  let pos = 5;
  let i;
  for (i = 12; i >= 1; i--) {
    add += parseInt(value.charAt(12 - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  let resultado = (10 * add) % 11;
  if (resultado === 10) {
    resultado = 0;
  }
  if (resultado !== parseInt(value.charAt(12))) {
    return false;
  }

  add = 0;
  pos = 6;
  for (i = 13; i >= 1; i--) {
    add += parseInt(value.charAt(13 - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  resultado = (10 * add) % 11;
  if (resultado === 10) {
    resultado = 0;
  }
  if (resultado !== parseInt(value.charAt(13))) {
    return false;
  }

  return true;
}
