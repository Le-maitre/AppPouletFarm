import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { Recette } from './recette'; // Assurez-vous d'importer correctement le modèle PouletMort

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  
  private updateEvent = new Subject<void>();

  update$ = this.updateEvent.asObservable();

  private apiUrl = 'http://localhost:8080/api/recette'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient) { }

  triggerUpdate() {
    this.updateEvent.next();
  }

  // Récupérer toutes les pertes de poulets pour une entrée spécifique
  getAllRecetteForEntree(entreeId: number): Observable<Recette[]> {
    console.log("entryid====",entreeId)
    const url = `${this.apiUrl}/entree/${entreeId}`;
    return this.http.get<Recette[]>(url);
  }

  // Ajouter une nouvelle perte de poulet pour une entrée spécifique
  addRecetteForEntree(entreeId: number, recette: Recette): Observable<Recette> {
    const url = `${this.apiUrl}/entree/${entreeId}/add`;
    return this.http.post<Recette>(url, recette);
  }

 // Supprimer une perte de poulet par son ID pour une entrée spécifique
 deleteRecetteForEntree(entreeId: number, recetteId: number): Observable<void> {
  const url = `${this.apiUrl}/entree/${entreeId}/delete/${recetteId}`; // Correction du passage de l'ID de la perte
  return this.http.delete<void>(url);
}
}
