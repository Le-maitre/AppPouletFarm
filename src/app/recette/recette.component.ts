import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetteService } from '../recette.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.scss'],
})
export class RecetteComponent  implements OnInit {
  recettes: any[] = [];
  entryId: any;

  constructor(
    private recetteService: RecetteService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.entryId = localStorage.getItem('entry');
    if (this.entryId !== null) {
      this.entryId = parseInt(this.entryId);
      if (!isNaN(this.entryId)) {
        this.getAllRecette(this.entryId);
      }
    }
    this.recetteService.update$.subscribe(() => {
      this.getAllRecette(this.entryId); // Fetch updated losses after update trigger
    });
  }

  getAllRecette(entryId: number): void {
    this.recetteService.getAllRecetteForEntree(this.entryId).subscribe(
      (data: any[]) => {
        this.recettes = data;
      },
      (error) => {
        console.error('Error fetching losses: ', error);
      }
    );
  }

  deleteRecette(recetteId: number): void {
    this.recetteService.deleteRecetteForEntree(this.entryId, recetteId).subscribe(() => {
      this.recetteService.triggerUpdate(); // Trigger update after deleting loss
    });
  }

  async confirmDeleteRecette(perteId: number): Promise<void> {
    const confirmAlert = await this.alertController.create({
      header: 'Confirmation',
      message: 'êtes vous sûr de vouloir supprimer cette perte?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.deleteRecette(perteId);
          },
        },
      ],
    });
    await confirmAlert.present();
  }
}
