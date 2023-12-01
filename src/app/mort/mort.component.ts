import { Component, OnInit } from '@angular/core';
import { PouletMortService } from '../pouletmort.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mort',
  templateUrl: './mort.component.html',
  styleUrls: ['./mort.component.scss'],
})
export class MortComponent  implements OnInit {
  pertes: any[] = []; // Assurez-vous que la propriété est nommée 'pertes'
  entryId: any;

  constructor(
    private pouletMortService: PouletMortService,
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
        this.getAllPertes(this.entryId);
      }
    }
  }

  // Méthode pour récupérer les détails des pertes liées à une entrée spécifique
  getAllPertes(entryId: number): void {
    this.pouletMortService.getAllPertesForEntree(this.entryId).subscribe(
      (data: any[]) => {
        this.pertes = data; // Affecter les détails des pertes à la propriété 'pertes' pour affichage
      },
      (error) => {
        console.error('Erreur lors de la récupération des pertes : ', error);
      }
    );
  }

  // Méthode pour supprimer une perte par son ID
  deletePerte(perteId: number): void {
    this.pouletMortService.deletePerteForEntree(this.entryId, perteId).subscribe(() => {
      // Rafraîchir la liste des pertes après la suppression
      if (this.entryId !== null) {
        this.getAllPertes(parseInt(this.entryId));
      }
    });
  }

  // Méthode pour afficher la boîte de dialogue de confirmation
  async confirmDeletePerte(perteId: number): Promise<void> {
    const confirmAlert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir supprimer cette perte ?',
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
            this.deletePerte(perteId);
          },
        },
      ],
    });
    await confirmAlert.present();
  }
}