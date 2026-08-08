import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { AuthValidationService } from '../../services/auth/auth-validation.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly authValidationService = inject(AuthValidationService);
  private readonly router = inject(Router);

  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      username: new FormControl(null, [
        Validators.pattern(this.authValidationService.usernameRegex),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dateOfBirth: new FormControl(null, [Validators.required, this.authValidationService.dateValidation()]),
      gender: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.authValidationService.passwordRegex),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
    },
    {
      validators: this.authValidationService.rePasswordValidation,
    },
  );

  signup() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.signUp(this.registerForm.value)
        .pipe(finalize(() => { this.isLoading = false }))
        .subscribe({
          next: () => {
            this.router.navigate(['login']);
          }
        });
    }
  }
}
