import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { SignInREQ, SignUp_InRES, SignUpREQ } from '../../interfaces/i-auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  signUp(data: SignUpREQ): Observable<SignUp_InRES> {
    return this.httpClient.post<SignUp_InRES>(environment.baseUrl + '/users/signup', data);
  }

  signin(data: SignInREQ): Observable<SignUp_InRES> {
    return this.httpClient.post<SignUp_InRES>(environment.baseUrl + '/users/signin', data);
  }

  signout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('decodedToken');
    this.router.navigate(['/login']);
  }
}
