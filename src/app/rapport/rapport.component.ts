import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss'],
})
export class RapportComponent  implements OnInit {


  // Déclarations des variables pour stocker les valeurs des champs d'entrée et du rapport généré
  nombreDePoussins: number=0;
  nombreDeDeces: number=0;
  prixDuKilo: number=0;
  rapportGenere: number=0;
   

  ngOnInit() {
  }
  constructor(private alertController: AlertController) {}

  async genererRapport() {
    if (this.nombreDePoussins && this.nombreDeDeces && this.prixDuKilo) {
      this.rapportGenere = (this.nombreDePoussins - this.nombreDeDeces) * this.prixDuKilo * 1.15;
      await this.presentAlert();
    } else {
      // Gestion d'une erreur si les champs ne sont pas tous remplis
      // Ici, vous pouvez afficher un message d'erreur ou gérer l'absence de valeurs selon vos besoins.
    }
  }
async presentAlert() {
  const roundedRapport = Math.round(this.rapportGenere).toString(); // Convertir la valeur arrondie en chaîne de caractères
  const formattedRapport = roundedRapport.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // Ajouter un espace tous les trois chiffres

  const alert = await this.alertController.create({
    header: 'Rapport généré pour les poulets performants de plus de 35jrs',
    message: `
      La valeur du rapport est : ${formattedRapport}  XOF `,
    buttons: ['OK']
  });
  await alert.present();
}

  
}
  
