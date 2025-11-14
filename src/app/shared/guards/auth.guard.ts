import { CanActivateFn, Router } from '@angular/router';
import { LoginserviceService } from '../services/authservices/loginservice.service';
import { inject } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginserviceService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    const toastr = inject(ToastrService);
    toastr.error('Vous devez être connecté pour accéder à cette page.')
    authService.logout(); // nettoie au cas où
    router.navigate(['/connexion']);
    return false;
  }
};
