import { Component, OnInit } from '@angular/core';
import { CalendarModule, CalendarView } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss'],
})
export class CalendrierComponent  implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: any[] = [
    {
      title: 'Événement 1',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
    },
    // ... Autres événements
  ];

  constructor() {

  }
  ngOnInit(): void {
  }
}