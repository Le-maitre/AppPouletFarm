import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aliment } from './aliment';

@Injectable({
  providedIn: 'root'
})
export class AlimentService {
  private apiUrl = 'http://localhost:8080/api/nourriture'; // Remplacez par votre URL backend

  constructor(private http: HttpClient) { }

  getAlimentsByEntreeId(entreeId: number): Observable<Aliment[]> {
    return this.http.get<Aliment[]>(`${this.apiUrl}/entree/${entreeId}`);
  }

  createOrUpdateAliment(entreeId: number, aliment: Aliment): Observable<Aliment> {
    return this.http.post<Aliment>(`${this.apiUrl}/create/${entreeId}`, aliment);
  }

  deleteAliment(alimentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${alimentId}`);
  }
}
