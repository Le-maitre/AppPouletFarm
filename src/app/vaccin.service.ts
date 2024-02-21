import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { Vaccination } from './vaccination';

@Injectable({
  providedIn: 'root'
})
export class VaccinService {
  private updateEvent = new Subject<void>();

  update$ = this.updateEvent.asObservable();

  private apiUrl = 'http://localhost:8080/api/vaccinations'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient) { }
 triggerUpdate() {
    this.updateEvent.next();
  }
  // Récupérer toutes les vaccinations pour une entrée spécifique
  getAllVaccinationsForEntry(entryId: number): Observable<Vaccination[]> {
    const url = `${this.apiUrl}/entry/${entryId}/vaccinations`; // Utilisation de l'entryId pour filtrer les vaccinations
    return this.http.get<Vaccination[]>(url);
  }

  // Récupérer une vaccination par son ID
  getVaccinationById(id: number): Observable<Vaccination> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Vaccination>(url);
  }

  // Ajouter une nouvelle vaccination associée à une entrée spécifique
  saveVaccinationForEntry(vaccination: Vaccination, entryId: number): Observable<Vaccination> {
    const url = `${this.apiUrl}/entry/${entryId}`;
    return this.http.post<Vaccination>(url, vaccination);
  }

  // Supprimer une vaccination par son ID
  deleteVaccination(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
