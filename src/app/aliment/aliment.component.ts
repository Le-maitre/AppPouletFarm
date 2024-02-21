import { Component, OnInit } from '@angular/core';
import { Aliment } from '../aliment';
import { AlimentService } from '../aliment.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-aliment',
  templateUrl: './aliment.component.html',
  styleUrls: ['./aliment.component.scss'],
})
export class AlimentComponent implements OnInit {
  aliments: Aliment[] = [];
  entryId: any;

  constructor(private alimentService: AlimentService, private alertController: AlertController) { }

  ngOnInit() {
    this.entryId = localStorage.getItem('entry');
    if (this.entryId !== null) {
      this.entryId = parseInt(this.entryId);
      if (!isNaN(this.entryId)) {
        this.getAlimentsForEntry(this.entryId);
      }
      this.alimentService.update$.subscribe(() => {
        this.getAlimentsForEntry(this.entryId);
      });
    }
  }

  getAlimentsForEntry(entryId: number): void {
    this.alimentService.getAlimentsByEntreeId(entryId).subscribe((data: Aliment[]) => {
      this.aliments = data;
    });
  }
 // Méthode pour supprimer un bilan par son ID
 deleteAliment(alimentId: number): void {
  this.alimentService.deleteAliment(alimentId).subscribe(() => {
    // Rafraîchir la liste des bilans après la suppression
    if (this.entryId !== null) {
      this.getAlimentsForEntry(parseInt(this.entryId));
    }
  });
}



// Méthode pour afficher la boîte de dialogue de confirmation
async confirmDeleteBilan(alimentId: number): Promise<void> {
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
          this.deleteAliment(alimentId);
        },
      },
    ],
  });
  await confirmAlert.present();
}
}


