import { CanActivateFn, Router } from '@angular/router';
//import { AuthService } from '../auth.service';
import { AuthService } from 'src/app/services/auth.service';
import { inject } from '@angular/core';


//Checks if our user is logged in
export const authGuard: CanActivateFn = (route, state) => {
  if(inject(AuthService).session) return true;
  inject(Router).navigateByUrl('/')
  return false;
};
