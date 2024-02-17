// shared-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {
  private entriesSubject = new BehaviorSubject<any[]>([]);
  entries$ = this.entriesSubject.asObservable();

  constructor() {}

  updateEntries(entries: any[]) {
    this.entriesSubject.next(entries);
  }
}
