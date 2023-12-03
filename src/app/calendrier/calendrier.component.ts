
  import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EventService } from '../event.service';

function createEventId() {
  return String(Date.now());
}

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss'],
})
export class CalendrierComponent implements OnInit {
  events: any[] = []; 
  entryId: any;

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    locale: 'fr',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    firstDay: 1, 
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };
  
  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef, private eventService: EventService) {
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); 
    console.log("userid====",userId)
    if (userId !== null) {
      this.entryId = parseInt(userId);
      if (!isNaN(this.entryId)) { 
        this.getAllEvents(this.entryId); // Obtenir les événements pour cet utilisateur
      }
    }
  }

  getAllEvents(userId: number): void {
    this.eventService.getAllEventsForUser(userId).subscribe((data: any[]) => {
      console.log(data);
      this.events = data;
    });
  }
  ajouterEvenement() {
    const nom = prompt('Nom de l\'événement :');
    const dateEvent = prompt('Date de l\'événement (YYYY-MM-DD) :');
  
    if (nom !== null && dateEvent !== null) {
      // ... Votre logique pour traiter les données entrées (par exemple, ajouter à la base de données) ...
    }
  }
  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}