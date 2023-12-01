import { Component, OnInit } from '@angular/core';
import { VaccinService } from '../vaccin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vaccin',
  templateUrl: './vaccin.component.html',
  styleUrls: ['./vaccin.component.scss'],
})
export class VaccinComponent  implements OnInit {
  vaccins: any[] = []; // Assurez-vous que la propriété est nommée 'vaccins'
  entryId: any;

  constructor(
    private vaccinService: VaccinService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}



  ngOnInit(): void {
    this.entryId = localStorage.getItem('entry');
    if (this.entryId !== null) {
      this.entryId = parseInt(this.entryId);
      if (!isNaN(this.entryId)) {
        // Vérifier si entryId est un nombre valide
        this.getAllVaccinations(this.entryId); // Appeler la méthode pour récupérer les vaccins
      }
    }
  }

  // Méthode pour récupérer les détails des vaccins liés à une entrée spécifique
  getAllVaccinations(entryId: number): void {
    this.vaccinService.getAllVaccinationsForEntry(this.entryId).subscribe(
      (data: any[]) => {
        this.vaccins = data; // Affecter les détails des vaccins à la propriété 'vaccins' pour affichage
      },
      (error) => {
        console.error('Erreur lors de la récupération des vaccins : ', error);
      }
    );
  }
 // Méthode pour supprimer un bilan par son ID
 deleteVaccin(vaccinId: number): void {
  this.vaccinService.deleteVaccination(vaccinId).subscribe(() => {
    // Rafraîchir la liste des vaccins après la suppression
    if (this.entryId !== null) {
      this.getAllVaccinations(parseInt(this.entryId));
    }
  });
}



// Méthode pour afficher la boîte de dialogue de confirmation
async confirmDeleteVaccin(vaccinId: number): Promise<void> {
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
          this.deleteVaccin(vaccinId);
        },
      },
    ],
  });
  await confirmAlert.present();
}
}

