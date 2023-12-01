import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TacheBilan } from './tachebilan'; // Assurez-vous de l'importer correctement

@Injectable({
  providedIn: 'root'
})
export class TacheBilanService {
  private baseUrl = 'http://localhost:8080'; // Remplacez par l'URL de votre API Spring Boot

  constructor(private http: HttpClient) { }

  createTacheBilan(bilanPrevisionId: number, tacheBilan: TacheBilan): Observable<TacheBilan> {
    return this.http.post<TacheBilan>(`${this.baseUrl}/api/tachebilans/create/bilanprevisions/${bilanPrevisionId}`, tacheBilan);
  }

  getAllTacheBilans(): Observable<TacheBilan[]> {
    return this.http.get<TacheBilan[]>(`${this.baseUrl}/api/tachebilans/all`);
  }

  getTacheBilanById(id: number): Observable<TacheBilan> {
    return this.http.get<TacheBilan>(`${this.baseUrl}/api/tachebilans/${id}`);
  }

  updateTacheBilan(id: number, tacheBilan: TacheBilan): Observable<TacheBilan> {
    return this.http.put<TacheBilan>(`${this.baseUrl}/api/tachebilans/update/${id}`, tacheBilan);
  }

  deleteTacheBilan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/tachebilans/delete/${id}`);
  }

  getTacheBilansByBilanPrevisionId(bilanPrevisionId: number): Observable<TacheBilan[]> {
    return this.http.get<TacheBilan[]>(`${this.baseUrl}/api/tachebilans/bilanprevisions/${bilanPrevisionId}`);
  }
}
