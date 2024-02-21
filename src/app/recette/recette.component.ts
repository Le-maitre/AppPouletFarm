import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetteService } from '../recette.service';
import { AlertController } from '@ionic/angular';
import { Recette } from '../recette'; // Import the Recette interface

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.scss'],
})
export class RecetteComponent implements OnInit {
  recettes: any[] = []; // Declare the recettes array with Recette interface
  entryId: any;

  constructor(
    private recetteService: RecetteService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.entryId = parseInt(localStorage.getItem('entry') || '', 10);
    if (!isNaN(this.entryId)) {
      this.getAllRecette(this.entryId);
    }
    this.recetteService.update$.subscribe(() => {
      this.getAllRecette(this.entryId); // Fetch updated recettes after update trigger
    });
  }

  getAllRecette(entryId: number): void {
    this.recetteService.getAllRecetteForEntree(entryId).subscribe(
      (data: Recette[]) => {
        this.recettes = data;
      },
      (error) => {
        console.error('Error fetching recettes: ', error);
      }
    );
  }

  deleteRecette(recetteId: number): void {
    this.recetteService.deleteRecetteForEntree(this.entryId, recetteId).subscribe(() => {
      this.recetteService.triggerUpdate(); // Trigger update after deleting recette
    });
  }

  async confirmDeleteRecette(recetteId: number): Promise<void> {
    const confirmAlert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to delete this sale?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteRecette(recetteId);
          },
        },
      ],
    });
    await confirmAlert.present();
  }
}
