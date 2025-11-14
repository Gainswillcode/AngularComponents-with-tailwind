import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr = inject(ToastrService);

  const token = localStorage.getItem('token');
  const excludedUrls = ['/auth/login'];
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  // --- LOGIQUE D'AJOUT DU TOKEN (PREMIER PASSAGE) ---
  let requestToProceed = req;
  if (token && !isExcluded) {
    requestToProceed = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Erreur inconnue';

      // 1. Gestion des erreurs de connexion/réseau (statut 0)
      if (error.status === 0) {
        errorMessage = 'Impossible de joindre le serveur. Veuillez vérifier votre connexion.';
      }
      // 2. Tente de lire le corps de l'erreur (error.error)
      else if (error.error) {
        let errorBody = error.error;

        // Si c'est un BLOB (souvent le cas pour les erreurs de téléchargement/fichiers)
        if (errorBody instanceof Blob) {
          errorBody.text().then(txt => {
            try {
              const jsonError = JSON.parse(txt);
              errorMessage = jsonError.detail || jsonError.message || txt;
            } catch {
              errorMessage = txt;
            }
            toastr.error(errorMessage, `Erreur ${error.status}`);
          });
          // On retourne throwError immédiatement car le traitement est asynchrone
          return throwError(() => new Error('Erreur HTTP asynchrone traitée.'));
        }

        // Si le backend renvoie une STRING JSON → on la parse
        if (typeof errorBody === 'string') {
          try {
            errorBody = JSON.parse(errorBody);
          } catch {
            // Pas un JSON valide, on garde la chaîne comme message d'erreur
          }
        }

        // Tente d'extraire le message d'erreur à partir de l'objet parsé ou de la chaîne
        if (errorBody?.detail) {
          errorMessage = errorBody.detail; // Django, Fastapi, etc.
        } else if (errorBody?.message) {
          errorMessage = errorBody.message; // Format standard
        } else if (errorBody?.error) {
          errorMessage = errorBody.error; // Format courant
        } else if (typeof errorBody === 'string') {
          errorMessage = errorBody; // Le corps est une simple chaîne de caractères
        } else {
          // Dernier recours si errorBody est un objet complexe non géré
          errorMessage = `Erreur ${error.status} : Veuillez consulter la console.`;
        }
      }
      // 3. Messages par statut HTTP
      else if (error.status === 401) {
        errorMessage = 'Non autorisé / Jeton invalide ou expiré';
      }
      else if (error.status === 403) {
        errorMessage = 'Accès refusé / Droits insuffisants';
      }
      else if (error.status === 404) {
        errorMessage = 'Ressource introuvable sur le serveur';
      } else {
        errorMessage = `Erreur ${error.status}: Une erreur s'est produite.`;
      }


      // Affichage du Toastr et propagation de l'erreur
      console.error('HTTP Error:', error);

      // Si l'erreur n'a pas déjà été traitée par le Blob asynchrone
      if (! (error.error instanceof Blob)) {
        toastr.error(errorMessage, `Erreur ${error.status}`);
      }

      // Propage l'erreur pour que les composants/services puissent la gérer
      return throwError(() => new Error(errorMessage));
    })
  );

};
