import { Component, OnInit } from '@angular/core';
import { PouletMortService } from '../pouletmort.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Import AlertController
import { PouletMort } from '../pouletmort';

@Component({
  selector: 'app-ajoutmort',
  templateUrl: './ajoutmort.component.html',
  styleUrls: ['./ajoutmort.component.scss'],
})
export class AjoutmortComponent implements OnInit {
  formData: any = {};
  entryId: any;
  successMessage: string = '';

  constructor(
    private pouletMortService: PouletMortService,
    private router: Router,
    private alertController: AlertController // Inject AlertController
  ) {}

  ngOnInit(): void {
    const entryIdFromStorage = localStorage.getItem('entry');
    if (entryIdFromStorage !== null && !isNaN(Number(entryIdFromStorage))) {
      this.entryId = parseInt(entryIdFromStorage, 10);
    }
  }

  async ajouterPerte(): Promise<void> {
    if (!this.isFormValid()) {
      // Display an alert if the form is not valid
      const alert = await this.alertController.create({
        header: 'Invalid Form',
        message: 'Veuillez remplir tous les champs.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.entryId !== null) {
      const pouletMortData: PouletMort = {
        id: 0,
        causeDeces: this.formData.causeDeces,
        datePerte: this.formData.datePerte,
        nombre: this.formData.nombre,
      };
      this.pouletMortService.addPerteForEntree(this.entryId, pouletMortData).subscribe(
        (response) => {
          console.log('Perte de poulet ajoutée avec succès :', response);
          this.successMessage = 'Perte de poulet ajoutée avec succès !';
          setTimeout(() => {
            this.router.navigate(['./mort']); // Replace './your-path' with the appropriate path
          }, 2000); // Redirect after 2 seconds (you can adjust this value)
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la perte de poulet :', error);
          // Handle error: Show an error message to the user or perform appropriate actions.
        }
      );
    } else {
      // Display an alert for an invalid entry ID
      const alert = await this.alertController.create({
        header: 'Invalid Entry ID',
        message: 'Invalid entry ID.',
        buttons: ['OK']
      });
      await alert.present();
      // Handle this situation appropriately for your application
    }
  }

  isFormValid(): boolean {
    // Validate the form data here before sending for addition
    return (
      this.formData.causeDeces &&
      this.formData.datePerte &&
      this.formData.nombre
      // Add other validations if necessary
    );
  }
}
