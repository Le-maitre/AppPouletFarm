
  import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EventService } from '../event.service';
import { MatDialog } from '@angular/material/dialog';
import { AjouterEvenementComponent } from '../ajouter-evenement/ajouter-evenement.component';

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

  constructor(private changeDetector: ChangeDetectorRef, private eventService: EventService, public dialog: MatDialog) {
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
  ajouterEvenement(): void {
    const dialogRef = this.dialog.open(AjouterEvenementComponent, {
      width: '300px', // Définissez la largeur de la boîte de dialogue modale
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Boîte de dialogue fermée. Résultat :', result);
      // Traitez ici le résultat obtenu après la fermeture de la boîte de dialogue
    });
  }
  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Veuillez entrer un titre pour votre événement');
    const calendarApi = selectInfo.view.calendar;
  
    calendarApi.unselect(); // Effacer la sélection de date
  
    if (title) {
      const dateEvent = selectInfo.startStr;
      const newEvent = {
        nom: title,
        dateEvent: new Date(dateEvent)
      };
  
      const userId = localStorage.getItem('userId');
      if (userId !== null) {
        const userIdNumber = parseInt(userId);
        if (!isNaN(userIdNumber)) {
          this.eventService.createEvent(userIdNumber, newEvent as any).subscribe((createdEvent: any) => {
            console.log('Événement ajouté avec succès :', createdEvent);
            // Traitez ici la réussite de l'ajout de l'événement dans la base de données
          }, error => {
            console.error('Erreur lors de l\'ajout de l\'événement :', error);
            // Traitez ici les erreurs lors de l'ajout de l'événement
          });
        }
      }
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