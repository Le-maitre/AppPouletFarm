import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PouletMort } from './pouletmort'; // Assurez-vous d'importer correctement le modèle PouletMort

@Injectable({
  providedIn: 'root'
})
export class PouletMortService {
  private apiUrl = 'http://localhost:8080/api/pouletmort'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Récupérer toutes les pertes de poulets pour une entrée spécifique
  getAllPertesForEntree(entreeId: number): Observable<PouletMort[]> {
    console.log("entryid====",entreeId)
    const url = `${this.apiUrl}/entree/${entreeId}`;
    return this.http.get<PouletMort[]>(url);
  }

  // Ajouter une nouvelle perte de poulet pour une entrée spécifique
  addPerteForEntree(entreeId: number, pouletMort: PouletMort): Observable<PouletMort> {
    const url = `${this.apiUrl}/entree/${entreeId}/add`;
    return this.http.post<PouletMort>(url, pouletMort);
  }

 // Supprimer une perte de poulet par son ID pour une entrée spécifique
 deletePerteForEntree(entreeId: number, perteId: number): Observable<void> {
  const url = `${this.apiUrl}/entree/${entreeId}/delete/${perteId}`; // Correction du passage de l'ID de la perte
  return this.http.delete<void>(url);
}
}
