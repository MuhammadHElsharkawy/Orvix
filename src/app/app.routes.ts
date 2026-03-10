import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { authGuard } from './core/guards/auth/auth-guard';
import { mainGuard } from './core/guards/main/main-guard';
import { PostDetailsComponent } from './features/post-details/post-details.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';

export const routes: Routes = [


    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '', component: AuthLayoutComponent, canActivate: [mainGuard], children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent }
    ] },
    { path: '', component: MainLayoutComponent, canActivate: [authGuard], children: [
        { path: 'home', component: HomeComponent },
        { path: 'post-details/:id', component: PostDetailsComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'profile/:id', component :ProfileComponent },
        { path: 'settings', component: ChangePasswordComponent }
    ] }


    // { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    // { path: 'auth', component: AuthLayoutComponent, children: [
    //     { path: 'login', component: LoginComponent },
    //     { path: 'register', component: RegisterComponent }
    // ] },
    // { path: 'main', component: MainLayoutComponent, children: [
    //     { path: 'home', component: HomeComponent }
    // ] }
];
