import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LocationStoreService {

  private countriesSubject = new BehaviorSubject<any[]>([]);
  private regionsSubject = new BehaviorSubject<any[]>([]);


   countries$ = this.countriesSubject.asObservable();
  regions$ = this.regionsSubject.asObservable();

  // constructor(private locationService: ToolsServices) {
  //   this.loadCountries();
  //   this.loadRegions();
  // }

  // private loadCountries() {
  //   this.locationService.getALLCountries().subscribe({
  //     next: (data) => this.countriesSubject.next(data),
  //     error: (err) => console.error('Erreur chargement pays', err)
  //   });
  // }

  // private loadRegions() {
  //   this.locationService.getAllRegions().subscribe({
  //     next: (data) => this.regionsSubject.next(data),
  //     error: (err) => console.error('Erreur chargement régions', err)
  //   });
  // }

  /** Si tu veux forcer le rechargement (ex: bouton “Rafraîchir”) */
  // refresh() {
  //   this.loadCountries();
  //   this.loadRegions();
  // }

}
