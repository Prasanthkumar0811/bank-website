import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';

export const authguardGuard: CanActivateFn = (route, state) => {
  const authservice=inject(AuthserviceService)
  const router=inject(Router)
  if(authservice.isLoggedIn()){
     return true
  }
  router.navigate(['/register'])
  return false;
};
