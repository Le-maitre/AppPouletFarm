import { Component, OnInit } from '@angular/core';
import { VaccinService } from '../vaccin.service';
import { Router } from '@angular/router';
import { Vaccination } from '../vaccination';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ajoutvaccin',
  templateUrl: './ajoutvaccin.component.html',
  styleUrls: ['./ajoutvaccin.component.scss'],
})
export class AjoutvaccinComponent  implements OnInit {
  formData: any = {};
  successMessage: string = '';
  entryId: any;

  constructor(private vaccinService: VaccinService, private router: Router, private alertController: AlertController) {}

  ngOnInit(): void {
    const entryIdFromStorage = localStorage.getItem('entry');
    if (entryIdFromStorage !== null && !isNaN(Number(entryIdFromStorage))) {
      this.entryId = parseInt(entryIdFromStorage, 10);
    }
  }

  ajoutervaccin(): void {
    if (!this.isFormValid()) {
      console.error('Le formulaire n\'est pas valide. Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (this.entryId !== null) {
      const vaccinationData : Vaccination = {
        typeVaccin: this.formData.typeVaccin,
        dateVaccination: this.formData.dateVaccination,
        id: 0
      };
      this.vaccinService.saveVaccinationForEntry(vaccinationData, this.entryId).subscribe(
        (response) => {
          console.log('Vaccin ajouté avec succès :', response);
          this.successMessage = 'Vaccin ajouté avec succès !';
          this.presentAlert('Success', 'Vaccin ajouté avec succès !'); // Display success alert
          this.resetForm(); // Reset form fields
          this.vaccinService.triggerUpdate();
          
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du bilan :', error);
          // Gérer l'erreur : Afficher un message d'erreur à l'utilisateur ou effectuer les actions appropriées.
        }
      );
    } else {
      console.error('ID d\'entrée invalide.');
      // Gérer cette situation d'une manière appropriée pour votre application
    }
  }

  isFormValid(): boolean {
    return (
      this.formData.typeVaccin && this.formData.dateVaccination
      // Ajoutez ici d'autres vérifications si nécessaire pour valider le formulaire
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