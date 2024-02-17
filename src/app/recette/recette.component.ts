import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BilanService } from '../bilan.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.scss'],
})
export class RecetteComponent  implements OnInit {
  bilans: any[] = []; // Ensure the property is named 'bilans'
  entryId: any;
  bilanEntries: any[] = [];
  
  constructor( private bilanService: BilanService,private router: Router,
    private route: ActivatedRoute, private alertController: AlertController) { }

    ngOnInit(): void {
      this.entryId = localStorage.getItem("entry");
      if (this.entryId !== null) {
        this.entryId = parseInt(this.entryId);
        if (!isNaN(this.entryId)) { // Vérifier si entryId est un nombre valide
          this.getBilansForEntry(this.entryId); // Appeler la méthode pour récupérer les bilans
        }
      }
    }
    
  
    navigateToDetailBilan(bilanId: number): void {
      this.router.navigate(['../detailbilan', bilanId]);
    }
    

  getBilansForEntry(entryId:number): void {
    
    this.bilanService.getBilansForEntry(entryId!).subscribe((data: any[]) => {
      console.log(data); 
      this.bilans = data;
    });
  }

   // Méthode pour supprimer un bilan par son ID
   deleteBilan(bilanId: number): void {
    this.bilanService.deleteBilanById(bilanId).subscribe(() => {
      // Rafraîchir la liste des bilans après la suppression
      if (this.entryId !== null) {
        this.getBilansForEntry(parseInt(this.entryId));
      }
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



