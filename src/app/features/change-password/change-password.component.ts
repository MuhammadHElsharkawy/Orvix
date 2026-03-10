import { Component, inject } from '@angular/core';
import { SettingsService } from '../../core/services/settings/settings.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly settings = inject(SettingsService)

  passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/
  rePasswordValidation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.get('new')?.value
    const rePassword: string = control.get('confirm')?.value
    return (password == rePassword) ? null : { passwordMatch: true }
  }
  changePasswordForm: FormGroup = new FormGroup({
    old: new FormControl(null, [Validators.required]),
    new: new FormControl(null, [Validators.required, Validators.pattern(this.passwordRegex)]),
    confirm: new FormControl(null, [Validators.required])
  }, {
    validators: this.rePasswordValidation
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
