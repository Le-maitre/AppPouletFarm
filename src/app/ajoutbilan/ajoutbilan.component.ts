import { Component, OnInit } from '@angular/core';
import { BilanService } from '../bilan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Import AlertController

@Component({
  selector: 'app-ajoutbilan',
  templateUrl: './ajoutbilan.component.html',
  styleUrls: ['./ajoutbilan.component.scss'],
})
export class AjoutbilanComponent implements OnInit {
  formData: any = {};
  successMessage: string = '';

  constructor(
    private bilanService: BilanService,
    private router: Router,
    private alertController: AlertController // Inject AlertController
  ) {}

  ngOnInit(): void {}

  async ajouterBilan(): Promise<void> {
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

    const entryId = localStorage.getItem("entry");
    if (entryId !== null && !isNaN(Number(entryId))) {
      const entryIdAsNumber = parseInt(entryId);
      this.bilanService.ajouterBilan(entryIdAsNumber, this.formData).subscribe(
        (response) => {
          console.log('Bilan ajouté avec succès :', response);
          this.successMessage = 'Bilan ajouté avec succès !'; // Set success message

          setTimeout(() => {
            this.router.navigate(['../bilan']);
          }, 2000);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du bilan :', error);
          // Handle error: Show an error message to the user or perform appropriate actions.
        }
      );
    } else {
      // Display an alert for an invalid entry in local storage
      const alert = await this.alertController.create({
        header: 'Invalid Entry',
        message: 'Invalid entry value in local storage.',
        buttons: ['OK']
      });
      await alert.present();
      // Handle this situation appropriately for your application
    }
  }

  isFormValid(): boolean {
    return (
      this.formData.nom && this.formData.prix && this.formData.description
    );
  }
}
