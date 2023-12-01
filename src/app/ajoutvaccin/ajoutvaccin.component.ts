import { Component, OnInit } from '@angular/core';
import { VaccinService } from '../vaccin.service';
import { Router } from '@angular/router';
import { Vaccination } from '../vaccination';

@Component({
  selector: 'app-ajoutvaccin',
  templateUrl: './ajoutvaccin.component.html',
  styleUrls: ['./ajoutvaccin.component.scss'],
})
export class AjoutvaccinComponent  implements OnInit {
  formData: any = {};
  successMessage: string = '';
  entryId: any;

  constructor(private vaccinService: VaccinService, private router: Router) {}

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
          setTimeout(() => {
            this.router.navigate(['./vaccin']);
          }, 2000);
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
}