import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from '../event.service';

@Component({
  selector: 'app-ajouter-evenement',
  templateUrl: './ajouter-evenement.component.html',
  styleUrls: ['./ajouter-evenement.component.scss'],
})
export class AjouterEvenementComponent  implements OnInit {
  nom: string = '';
  dateEvent: string = '';

  constructor(public dialogRef: MatDialogRef<AjouterEvenementComponent>,private eventService: EventService ) {}
  ngOnInit(): void {
  }

  ajouter(): void {
    if (this.nom.trim() && this.dateEvent.trim()) {
    
      const newEvent = {
        nom: this.nom,
        dateEvent: new Date
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
      } else {
        console.log('Veuillez remplir tous les champs.');
      }
    }
  }


  fermer(): void {
    this.dialogRef.close();
  }
}