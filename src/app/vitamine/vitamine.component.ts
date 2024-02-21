import { Component, OnInit } from '@angular/core';
import { VitamineService } from '../vitamine.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vitamine',
  templateUrl: './vitamine.component.html',
  styleUrls: ['./vitamine.component.scss'],
})
export class VitamineComponent  implements OnInit {
  vitamines: any[] = []; // Assurez-vous que la propriété est nommée 'vaccins'
  entryId: any;

  constructor(
    private vitamineService: VitamineService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.entryId = localStorage.getItem('entry');
    if (this.entryId !== null) {
      this.entryId = parseInt(this.entryId);
      if (!isNaN(this.entryId)) {
        this.getAllVtamines(this.entryId);
      }
    }
    this.vitamineService.update$.subscribe(() => {
      if (this.entryId !== null) {
        this.getAllVtamines(parseInt(this.entryId));
      }
    });
  }

  // Méthode pour récupérer les détails des vaccins liés à une entrée spécifique

getAllVtamines(entryId: number): void {
  this.vitamineService.getAllVitaminesForEntry(entryId).subscribe(
    (data: any[]) => {
      this.vitamines = data; // Affecter les détails des vaccins à la propriété 'vaccins' pour affichage
    },
    (error) => {
      console.error('Erreur lors de la récupération des vitamines : ', error);
    }
  );
}

 // Méthode pour supprimer un bilan par son ID
 deleteVaccin(vitamineId: number): void {
  this.vitamineService.deleteVitamineForEntry(this.entryId, vitamineId).subscribe(() => {
    // Rafraîchir la liste des vitamines après la suppression
    if (this.entryId !== null) {
      this.getAllVtamines(parseInt(this.entryId));
    }
  });
}




// Méthode pour afficher la boîte de dialogue de confirmation
async confirmDeleteVitamine(vitamineId: number): Promise<void> {
  const confirmAlert = await this.alertController.create({
    header: 'Confirmation',
    message: 'Êtes-vous sûr de vouloir supprimer ce bilan ?',
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        handler: () => {
          // L'utilisateur a annulé la suppression
        },
      },
      {
        text: 'Supprimer',
        handler: () => {
          // L'utilisateur a confirmé la suppression
          this.deleteVaccin(vitamineId);
        },
      },
    ],
  });
  await confirmAlert.present();
}
}

