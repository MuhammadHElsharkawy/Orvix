import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(catchError(err => {
    console.log('interceptor error', err);
    toastr.error(err.error.message, 'error');
    return throwError(() => err)
  }))
};
