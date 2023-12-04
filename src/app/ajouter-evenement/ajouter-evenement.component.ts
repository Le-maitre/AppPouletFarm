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
    // if (this.nom.trim() && this.dateEvent.trim()) {
    //   const nouvelEvenement: Event = {
    //     nom: this.nom,
    //     dateEvent: this.dateEvent
    //   };

    //   const userId = localStorage.getItem('userId');
    //   if (userId) {
    //     const userIdNumber = parseInt(userId, 10);
    //     this.eventService.createEvent(userIdNumber, nouvelEvenement).subscribe(
    //       (nouvelEvenementAjoute: any) => {
    //         console.log('Événement ajouté :', nouvelEvenementAjoute);
    //         this.dialogRef.close(nouvelEvenementAjoute);
    //       },
    //       (error: any) => {
    //         console.error('Erreur lors de l\'ajout de l\'événement :', error);
    //       }
    //     );
    //   }
    // } else {
    //   console.log('Veuillez remplir tous les champs.');
    // }
  }

  fermer(): void {
    this.dialogRef.close();
  }
}