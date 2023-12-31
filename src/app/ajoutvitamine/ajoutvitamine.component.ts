import { Component, OnInit } from '@angular/core';
import { VitamineService } from '../vitamine.service';
import { Router } from '@angular/router';
import { Vaccination } from '../vaccination';
import { Vitamine } from '../vitamine';

@Component({
  selector: 'app-ajoutvitamine',
  templateUrl: './ajoutvitamine.component.html',
  styleUrls: ['./ajoutvitamine.component.scss'],
})
export class AjoutvitamineComponent  implements OnInit {
  formData: any = {};
  successMessage: string = '';
  entryId: any;

  constructor(private vitamineService: VitamineService, private router: Router) {}

  ngOnInit(): void {
    const entryIdFromStorage = localStorage.getItem('entry');
    if (entryIdFromStorage !== null && !isNaN(Number(entryIdFromStorage))) {
      this.entryId = parseInt(entryIdFromStorage, 10);
    }
  }

  ajoutervitamine(): void {
    if (!this.isFormValid()) {
      console.error('Le formulaire n\'est pas valide. Veuillez remplir tous les champs obligatoires.');
      return;
    }
  
    if (this.entryId !== null) {
      const vitamineData: Vitamine = {
        nomVitamine: this.formData.nomVitamine,
        quantite: this.formData.quantite,
        id: 0
      };
  
      this.vitamineService.saveVitamineForEntry(this.entryId, vitamineData).subscribe(
        (response) => {
          console.log('Vitamine ajoutée avec succès :', response);
          this.successMessage = 'Vitamine ajoutée avec succès !';
          setTimeout(() => {
            this.router.navigate(['./vitamine']);
          }, 2000);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la vitamine :', error);
          // Gérer l'erreur : Afficher un message d'erreur à l'utilisateur ou effectuer les actions appropriées.
        }
      );
    } else {
      console.error('ID d\'entrée invalide.');
      // Gérer cette situation d'une manière appropriée pour votre application
    }
  }
  

  isFormValid(): boolean {
    console.log('Valeur de nomVitamine:', this.formData.nomVitamine);
    console.log('Valeur de quantite:', this.formData.quantite);
  
    // Autres validations
    // ...
  
    return (
      this.formData.nomVitamine && this.formData.quantite
      // Ajoutez ici d'autres vérifications si nécessaire pour valider le formulaire
    );
  }
  
  
}