import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api'; // Remplacez par l'URL correcte de votre API

  constructor(private http: HttpClient) {}

  createEvent(userId: number, event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/users/${userId}/events`, event);
  }
  getAllEventsForUser(userId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/users/${userId}/events`);
  }

  getEventForUserById(userId: number, eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/users/${userId}/events/${eventId}`);
  }
  updateEventForUser(userId: number, eventId: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/users/${userId}/events/${eventId}`, event);
  }

  deleteEventForUser(userId: number, eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}/events/${eventId}`);
  }
}