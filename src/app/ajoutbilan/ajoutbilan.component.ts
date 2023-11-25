import { Component, OnInit } from '@angular/core';
import { BilanService } from '../bilan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajoutbilan',
  templateUrl: './ajoutbilan.component.html',
  styleUrls: ['./ajoutbilan.component.scss'],
})
export class AjoutbilanComponent  implements OnInit {
  formData: any = {};
  successMessage: string = '';

  constructor(private bilanService: BilanService, private router: Router) {}

  ajouterBilan(): void {
    if (!this.isFormValid()) {
      console.error('Le formulaire n\'est pas valide. Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const entreeId = 1; // Remplacez par l'identifiant de l'entrée appropriée
    this.bilanService.ajouterBilan(entreeId, this.formData).subscribe(
      (response) => {
        console.log('Bilan ajouté avec succès :', response);
        this.successMessage = 'Bilan ajouté avec succès !'; // Définir le message de succès

        setTimeout(() => {
          this.router.navigate(['../bilan']);
        }, 2000);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du bilan :', error);
        // Gérer l'erreur : Afficher un message d'erreur à l'utilisateur ou effectuer les actions appropriées.
      }
    );
  }
  isFormValid(): boolean {
    return (
      this.formData.nom // Ajoutez ici les autres champs de votre formulaire
    );
  }


  ngOnInit() {}
}