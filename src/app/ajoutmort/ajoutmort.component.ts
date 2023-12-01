import { Component, OnInit } from '@angular/core';
import { PouletMortService } from '../pouletmort.service';
import { Router } from '@angular/router';
import { Vaccination } from '../vaccination';
import { PouletMort } from '../pouletmort';

@Component({
  selector: 'app-ajoutmort',
  templateUrl: './ajoutmort.component.html',
  styleUrls: ['./ajoutmort.component.scss'],
})
export class AjoutmortComponent  implements OnInit {
  formData: any = {}; // Les données du formulaire pour l'ajout de perte de poulet
  entryId: any;
  successMessage: string = ''; // Message de succès à afficher

  constructor(private pouletMortService: PouletMortService, private router: Router) {}

  ngOnInit(): void {
    const entryIdFromStorage = localStorage.getItem('entry');
    if (entryIdFromStorage !== null && !isNaN(Number(entryIdFromStorage))) {
      this.entryId = parseInt(entryIdFromStorage, 10);
    }
  }

  ajouterPerte(): void {
    if (!this.isFormValid()) {
      console.error('Le formulaire n\'est pas valide. Veuillez remplir tous les champs obligatoires.');
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
            this.router.navigate(['./votre-chemin']); // Remplacez './votre-chemin' par le chemin approprié
          }, 2000); // Rediriger après 2 secondes (vous pouvez ajuster cette valeur)
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la perte de poulet :', error);
          // Gérer l'erreur : Afficher un message d'erreur à l'utilisateur ou effectuer les actions appropriées.
        }
      );
    } else {
      console.error('ID d\'entrée invalide.');
      // Gérer cette situation d'une manière appropriée pour votre application
    }
  }

  isFormValid(): boolean {
    // Validez ici les données du formulaire avant de les envoyer pour l'ajout
    return (
      this.formData.causeDeces &&
      this.formData.datePerte &&
      this.formData.nombre
      // Ajoutez d'autres validations si nécessaire
    );
  }
}