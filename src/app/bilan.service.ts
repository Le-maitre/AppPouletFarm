import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BilanService {

  private updateEvent = new Subject<void>();

  update$ = this.updateEvent.asObservable();

  private baseUrl = 'http://localhost:8080/api/bilanprevisions'; // Replace with your Spring Boot backend URL
  
  constructor(private http: HttpClient) { }

  triggerUpdate() {
    this.updateEvent.next();
  }
  
  getBilansForEntry(entryId: number): Observable<any[]> {
    console.log("entree==========",entryId);
    return this.http.get<any[]>(`${this.baseUrl}/entree/${entryId}`);
  }

  deleteBilanById(bilanId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${bilanId}`);
  }
   // Ajouter un bilan associé à une entrée
   ajouterBilan(entryId: number, nouveauBilan: any): Observable<any> {
    console.log("entryservice====",entryId)
    return this.http.post<any>(`${this.baseUrl}/entree/${entryId}`, nouveauBilan);
  }
}
