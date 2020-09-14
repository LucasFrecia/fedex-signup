import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors
} from '@angular/forms';
import {invalid} from '@angular/compiler/src/render3/view/util';

/** Error when invalid control is dirty, touched, or submitted. */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** First name cannot be in password */
export function firstNameInPasswordValidator(control: FormGroup): ValidationErrors | null {
  const firstName = control.get('firstName');
  const password = control.get('password');

  if (!password || !firstName || !firstName.value || !password.value) {
    return null;
  }

  const hasFirstNameInPassword = password?.value?.toLowerCase().includes(firstName?.value?.toLowerCase());

  if (hasFirstNameInPassword) {
    password.setErrors({ firstOrLastNameInPassword: true });
  }

  return hasFirstNameInPassword
    ? { firstOrLastNameInPassword: true }
    : null;
}

/** Last name cannot be in password */
export function lastNameInPasswordValidator(control: FormGroup): ValidationErrors | null {
  const lastName = control.get('lastName');
  const password = control.get('password');

  if (!password || !lastName || !lastName.value || !password.value) {
    return null;
  }

  const hasLastNameInPassword = password?.value?.toLowerCase().includes(lastName?.value?.toLowerCase());

  if (hasLastNameInPassword) {
    password.setErrors({ firstOrLastNameInPassword: true });
  }

  return hasLastNameInPassword
    ? { firstOrLastNameInPassword: true }
    : null;
}

/** Password must contain lower and uppercase char */
export function lowerUppercaseValidator(input: FormControl): ValidationErrors | null {
  const hasExclamation = input?.value?.match(/[a-z]/) && input.value?.match(/[A-Z]/);
  return hasExclamation ? null : { lowerUppercase: true };
}
