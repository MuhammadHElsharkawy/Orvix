import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthValidationService {
  passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/;
  usernameRegex: RegExp = /^[a-z0-9_]{3,30}$/i;

  rePasswordValidation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.get('password')?.value;
    const rePassword: string = control.get('rePassword')?.value;
    return password == rePassword ? null : { passwordMatch: true };
  };

  dateValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate: Date = new Date(control.value);
      const today: Date = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate > today ? { futureDate: true } : null;
    };
  }
}
