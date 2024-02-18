import { Component, OnInit } from '@angular/core';
import { UserentriesService } from '../userentries.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { parse } from 'date-fns';

@Component({
  selector: 'app-ajoutentree',
  templateUrl: './ajoutentree.component.html',
  styleUrls: ['./ajoutentree.component.scss'],
})
export class AjoutentreeComponent implements OnInit {
  formData: any = {};
  userEntries: any[] = [];
  successMessage: string = ''; // Variable to hold the success message
  unfilledFields: string[] = []; // Array to hold unfilled fields

  constructor(
    private userentriesService: UserentriesService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController // Inject AlertController
  ) {}

  async addEntry() {
    const userId = localStorage.getItem("userId"); // Replace with the actual user ID

    // Check for unfilled fields
    this.unfilledFields = this.getUnfilledFields();

    if (this.unfilledFields.length > 0) {
      // If there are unfilled fields, display alert
      const unfilledFieldsMessage = `Veuillez remplir les champs suivants: ${this.unfilledFields.join(', ')}`;
      await this.presentAlert('Erreur', unfilledFieldsMessage);
      return;
    }

    this.userentriesService.addEntry(parseInt(userId!), this.formData).subscribe(
      (response) => {
        console.log('Entry added successfully:', response);
        this.successMessage = 'Entry added successfully!'; // Set success message
        this.fetchUserEntries(parseInt(userId!));
        this.router.navigate(['./tabs/tab1/entree']);
        setTimeout(() => {
          // Ensure this navigation works
        }, 2000); // Redirect after 2 seconds (adjust as needed)
      },
      (error) => {
        console.error('Error adding entry:', error);
        // Handle error: Show an error message to the user or perform appropriate actions.
      }
    );
  }

  async fetchUserEntries(userId: number) {
    await this.userentriesService.getUserEntries(userId).subscribe(
      (entries) => {
        this.userEntries = entries; // Update userEntries with the fetched entries
      },
      (error) => {
        console.error('Error fetching entries:', error);
        // Handle error, show error message, etc.
      }
    );
  }

  getUnfilledFields(): string[] {
    const unfilledFields: string[] = [];
    if (!this.formData.nom) {
      unfilledFields.push('Nom');
    }
    if (!this.formData.nombrePoussins) {
      unfilledFields.push('Nombre de Poussins');
    }
    if (!this.formData.dateEntree) {
      unfilledFields.push('Date d\'Entrée');
    }
    if (!this.formData.dateSortie) {
      unfilledFields.push('Date de Sortie');
    }
    return unfilledFields;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {}
}