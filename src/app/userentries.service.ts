import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entry } from './entry';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserentriesService {

  private updateEvent = new Subject<void>();

  update$ = this.updateEvent.asObservable();

  private apiUrl = 'http://localhost:8080'; // Replace this with your API URL

  constructor(private http: HttpClient) {}

  triggerUpdate() {
    this.updateEvent.next();
  }

  getUserEntries(userId: number): Observable<any[]> {
    // Assuming your API endpoint for fetching user entries is '/api/users/{userId}/entries'
    const url = `${this.apiUrl}/api/users/${userId}/entrees/all`;
    return this.http.get<any[]>(url);
  }

    // Method to delete an entry by its ID for a specific user
    deleteEntry(userId: number, entryId: number): Observable<any> {
      const url = `${this.apiUrl}/api/users/${userId}/entrees/${entryId}`;
      return this.http.delete<any>(url);
    }
    addEntry(userId: number, entryData: any) {
      return this.http.post(`http://localhost:8080/api/users/${userId}/entrees/create`, entryData);
    }
  getEntryById(entryId: number,userId:number): Observable<Entry> {
    console.log("value================",userId);
      const url = `${this.apiUrl}/api/users/${userId}/entrees/${entryId}`;
      return this.http.get<Entry>(url);
    }
  
    updateEntry(userId: number, entry: Entry): Observable<Entry> {
      const url = `${this.apiUrl}/api/users/${userId}/entrees/${entry.id}`;
      return this.http.put<Entry>(url, entry);
    }
  }