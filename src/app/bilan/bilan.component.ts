import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BilanService } from '../bilan.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.scss'],
})
export class BilanComponent  implements OnInit {
  bilans: any[] = []; // Ensure the property is named 'bilans'
  constructor( private bilanService: BilanService,
    private route: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit(): void {
    this.fetchBilansForEntry();
  }

  fetchBilansForEntry(): void {
    const entryId = 1;
    this.bilanService.getBilansForEntry(entryId).subscribe((data: any[]) => {
      console.log(data); 
      this.bilans = data;
    });
  }
   // Méthode pour supprimer un bilan par son ID
   deleteBilan(bilanId: number): void {
    this.bilanService.deleteBilanById(bilanId).subscribe(() => {
      // Rafraîchir la liste des bilans après la suppression
      this.fetchBilansForEntry();
    });
  }


  // Méthode pour afficher la boîte de dialogue de confirmation
  async confirmDeleteBilan(bilanId: number): Promise<void> {
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
            this.deleteBilan(bilanId);
          },
        },
      ],
    });
    await confirmAlert.present();
  }
}

