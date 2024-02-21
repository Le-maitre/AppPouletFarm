import { Component, OnInit } from '@angular/core';
import { PouletMortService } from '../pouletmort.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    const entryIdFromStorage = localStorage.getItem('entry');
    if (entryIdFromStorage !== null && !isNaN(Number(entryIdFromStorage))) {
      this.entryId = parseInt(entryIdFromStorage, 10);
    }
  }

  async ajouterPerte(): Promise<void> {
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
      const pouletMortData: PouletMort = {
        id: 0,
        causeDeces: this.formData.causeDeces,
        datePerte: this.formData.datePerte,
        nombre: this.formData.nombre,
      };
      this.pouletMortService.addPerteForEntree(this.entryId, pouletMortData).subscribe(
        (response) => {
          console.log('Poulet loss added successfully:', response);
          this.successMessage = 'Poulet loss added successfully!';
          this.presentAlert('Success', 'Perte ajoutée avec succès !'); // Display success alert
          this.resetForm(); // Reset form fields
          this.pouletMortService.triggerUpdate(); // Trigger update after adding loss
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
      this.formData.causeDeces &&
      this.formData.datePerte &&
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
