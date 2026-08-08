import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  })

  isLoading: boolean = false
  signin() {
    if (this.loginForm.valid) {
      this.isLoading = true
      this.authService.signin(this.loginForm.value)
        .pipe(finalize(() => { this.isLoading = false }))
        .subscribe({
          next: (res) => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('decodedToken', JSON.stringify(jwtDecode(res.data.token)))
            this.router.navigate(['home'])
          }
        })
    }
  }
}
