import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const mainGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if(localStorage.getItem('token')) {
    return router.parseUrl('/home')
  }
  else {
    return true
  }
};
