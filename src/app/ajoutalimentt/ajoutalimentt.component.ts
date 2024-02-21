import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlimentService } from '../aliment.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ajoutalimentt',
  templateUrl: './ajoutalimentt.component.html',
  styleUrls: ['./ajoutalimentt.component.scss'],
})
export class AjoutalimenttComponent  implements OnInit {
  formData: any = {};
  successMessage: string = '';

  constructor(private alimentService: AlimentService, private router: Router, private alertController: AlertController) {}

  ngOnInit(): void {}

  ajouterAliment(): void {
    if (!this.isFormValid()) {
      console.error('Le formulaire n\'est pas valide. Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const entryId = localStorage.getItem('entry');
    if (entryId !== null && !isNaN(Number(entryId))) {
      const entryIdAsNumber = parseInt(entryId);
      this.alimentService.createOrUpdateAliment(entryIdAsNumber, this.formData).subscribe(
        (response) => {
          console.log('Aliment ajouté avec succès :', response);
          this.successMessage = 'Aliment ajouté avec succès !';
          this.presentAlert('Success', 'Aliment ajouté avec succès !'); // Display success alert
          this.resetForm(); // Reset form fields
          this.alimentService.triggerUpdate(); // Trigger update after adding bilan
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'aliment :', error);
          // Gérer l'erreur : Afficher un message d'erreur à l'utilisateur ou effectuer les actions appropriées.
        }
      );
    } else {
      console.error('Valeur d\'entrée invalide dans le stockage local.');
      // Gérer cette situation d'une manière appropriée pour votre application
    }
  }

  isFormValid(): boolean {
    return (
      this.formData.typeNourriture && this.formData.quantite
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