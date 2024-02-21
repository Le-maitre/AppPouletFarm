import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss'],
})
export class RapportComponent  implements OnInit {

  nombreDePoussins: number = 0;
  nombreDeDeces: number = 0;
  prixDuKilo: number = 0;
  rapportGenere: number = 0;
   
  ngOnInit() {}

  constructor(private alertController: AlertController) {}

  async genererRapport() {
    if (this.nombreDePoussins && this.nombreDeDeces && this.prixDuKilo) {
      this.rapportGenere = (this.nombreDePoussins - this.nombreDeDeces) * this.prixDuKilo * 1.15;
      await this.presentAlert();
    } else {
      // Handle error if all fields are not filled
    }
  }

  async presentAlert() {
    const roundedRapport = Math.round(this.rapportGenere).toString();
    const formattedRapport = roundedRapport.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    const alert = await this.alertController.create({
      header: 'Rapport généré pour les poulets de plus de 35 jrs',
      message: `La valeur du rapport est: ${formattedRapport} FCFA`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Reset the field values
            this.nombreDePoussins = 0;
            this.nombreDeDeces = 0;
            this.prixDuKilo = 0;
            this.rapportGenere = 0;
          }
        }
      ]
    });
    await alert.present();
  }
}
