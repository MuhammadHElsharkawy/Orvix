import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header/header-interceptor';
import { errorInterceptor } from './core/interceptors/error/error-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(NgxSpinnerModule),
    provideToastr(),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor, errorInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
