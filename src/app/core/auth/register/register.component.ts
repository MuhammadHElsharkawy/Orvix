import { Component, inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  
  currentPage: string = ''
  ngOnInit(): void {
    this.currentPage = 'register'
  }

  passwordRegex:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/
  usernameRegex:RegExp = /^[a-z0-9_]{3,30}$/

  dateValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate:Date = new Date(control.value)
      const today:Date = new Date()
      today.setHours(0,0,0,0)
      return (selectedDate > today)? {futureDate: true} : null
    }
  }

  rePasswordValidation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password:string = control.get('password')?.value
    const rePassword:string = control.get('rePassword')?.value
    return (password == rePassword)? null : {passwordMatch: true}
  }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    username: new FormControl(null, [Validators.required ,Validators.pattern(this.usernameRegex)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    dateOfBirth: new FormControl(null, [Validators.required, this.dateValidation()]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordRegex)]),
    rePassword: new FormControl(null, [Validators.required]),
  }, {
    validators: this.rePasswordValidation
  })

  errorMessage: string = ''
  isLoading: boolean = false
  signup() {
    if(this.registerForm.valid) {
      this.isLoading = true
      this.authService.signUp(this.registerForm.value).subscribe({
        next:(res) => {
          console.log(res);
          this.isLoading = false
          this.router.navigate(['login'])
        },
        error:(err) => {
          this.errorMessage = err.error.message
          console.log(this.errorMessage);
          this.isLoading = false
        }
      })
    }
  }
}
