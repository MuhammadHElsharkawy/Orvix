import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

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
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  })
  
  isLoading:boolean = false
  wrongData:boolean = false
  signin() {
    if(this.loginForm.valid) {
      this.isLoading = true
      this.authService.signin(this.loginForm.value).subscribe({
        next:(res) => {
          // console.log(res);
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('decodedToken', JSON.stringify(jwtDecode(res.data.token)))
          this.isLoading = false
          this.router.navigate(['home'])
        },
        error:(err) => {
          console.log(err);
          this.wrongData = true
          this.isLoading = false
        }
      })
    }
  }
}
