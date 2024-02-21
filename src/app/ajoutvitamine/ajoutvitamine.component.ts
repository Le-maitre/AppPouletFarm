import { Component, OnInit } from '@angular/core';
import { RecetteService } from '../recette.service';
import { Router } from '@angular/router';
import { Vaccination } from '../vaccination';
import { Recette } from '../recette';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ajoutvitamine',
  templateUrl: './ajoutvitamine.component.html',
  styleUrls: ['./ajoutvitamine.component.scss'],
})
export class AjoutvitamineComponent  implements OnInit {
  formData: any = {};
  entryId: any;
  successMessage: string = '';

  constructor(
    private recetteService: RecetteService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    const entryIdFromStorage = localStorage.getItem('entry');
    if (entryIdFromStorage !== null && !isNaN(Number(entryIdFromStorage))) {
      this.entryId = parseInt(entryIdFromStorage, 10);
    }
  }

  async ajouterRecette(): Promise<void> {
    if (!this.isFormValid()) {
      const alert = await this.alertController.create({
        header: 'Invalid Form',
        message: 'Please fill in all fields.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.entryId !== null) {
      const recetteData: Recette = {
        id: 0,
        prix: this.formData.prix,
        dateVente: this.formData.dateVente,
        nombre: this.formData.nombre,
      };
      this.recetteService.addRecetteForEntree(this.entryId, recetteData).subscribe(
        (response) => {
          console.log('Poulet loss added successfully:', response);
          this.successMessage = 'Poulet loss added successfully!';
          this.presentAlert('Success', 'Recette ajoutée avec succès !'); // Display success alert
          this.resetForm(); // Reset form fields
          this.recetteService.triggerUpdate(); // Trigger update after adding loss
        },
        (error) => {
          console.error('Error adding poulet loss:', error);
        }
      );
    } else {
      const alert = await this.alertController.create({
        header: 'Invalid Entry ID',
        message: 'Invalid entry ID.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  isFormValid(): boolean {
    return (
      this.formData.prix &&
      this.formData.dateVente &&
      this.formData.nombre
    );
  }
  async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  resetForm(): void {
    this.formData = {}; // Reset form fields
  }
}
