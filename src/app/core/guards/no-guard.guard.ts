import { inject } from '@angular/core';
import { CanActivateFn, RouteConfigLoadEnd, Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';

export const noGuardGuard: CanActivateFn = (route, state) => {
  const service=inject(AuthserviceService)
  const router=inject(Router)
  if(service.isLoggedIn()){
    router.navigate(['/applications'])
    return false
  }
  return true;
};
