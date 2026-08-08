import { Component, inject } from '@angular/core';
import { SettingsService } from '../../core/services/settings/settings.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { AuthValidationService } from '../../core/services/auth/auth-validation.service';

@Component({
  selector: 'app-change-password',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly settings = inject(SettingsService)
  private readonly authValidationService = inject(AuthValidationService)

  changePasswordForm: FormGroup = new FormGroup({
    old: new FormControl(null, [Validators.required]),
    new: new FormControl(null, [Validators.required, Validators.pattern(this.authValidationService.passwordRegex)]),
    confirm: new FormControl(null, [Validators.required])
  }, {
    validators: this.authValidationService.rePasswordValidation
  })

  isLoading: boolean = false;
  prepareData(e: Event) {
    e.preventDefault()

    if(this.changePasswordForm.valid) {
      const formData = this.changePasswordForm.value
      const body = {
        password: formData.old,
        newPassword: formData.new
      }
      this.changePassword(body)      
    }

  }
  changePassword(data: any) {
    this.isLoading = true;
    this.settings.changePassword(data).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }
}
