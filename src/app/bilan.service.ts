import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BilanService {
  private baseUrl = 'http://localhost:8080/api/bilanprevisions'; // Replace with your Spring Boot backend URL
  
  constructor(private http: HttpClient) { }

  getBilansForEntry(entryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/entree/${entryId}`);
  }

  deleteBilanById(bilanId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${bilanId}`);
  }
   // Ajouter un bilan associé à une entrée
   ajouterBilan(entreeId: number, nouveauBilan: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/entree/${entreeId}`, nouveauBilan);
  }
}
