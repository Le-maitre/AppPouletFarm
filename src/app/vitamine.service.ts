import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vitamine } from './vitamine';

@Injectable({
  providedIn: 'root'
})
export class VitamineService {
  private apiUrl = 'http://localhost:8080/api/entree'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Récupérer toutes les vitamines pour une entrée spécifique
  getAllVitaminesForEntry(entryId: number): Observable<Vitamine[]> {
    const url = `${this.apiUrl}/${entryId}/vitamines`; // Utilisation de l'entryId pour filtrer les vitamines
    return this.http.get<Vitamine[]>(url);
  }

  // Récupérer une vitamine par son ID pour une entrée spécifique
  getVitamineByIdForEntry(entryId: number, id: number): Observable<Vitamine> {
    const url = `${this.apiUrl}/${entryId}/vitamines/${id}`;
    return this.http.get<Vitamine>(url);
  }

  // Ajouter une nouvelle vitamine pour une entrée spécifique
  saveVitamineForEntry(entryId: number, vitamine: Vitamine): Observable<Vitamine> {
    const url = `${this.apiUrl}/${entryId}/vitamines`;
    return this.http.post<Vitamine>(url, vitamine);
  }

  // Supprimer une vitamine par son ID pour une entrée spécifique
  deleteVitamineForEntry(entryId: number, id: number): Observable<void> {
    const url = `${this.apiUrl}/${entryId}/vitamines/${id}`;
    return this.http.delete<void>(url);
  }
}
