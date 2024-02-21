import { Component, OnInit } from '@angular/core';
import { PouletMortService } from '../pouletmort.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mort',
  templateUrl: './mort.component.html',
  styleUrls: ['./mort.component.scss'],
})
export class MortComponent implements OnInit {
  pertes: any[] = [];
  entryId: any;

  constructor(
    private pouletMortService: PouletMortService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.entryId = localStorage.getItem('entry');
    if (this.entryId !== null) {
      this.entryId = parseInt(this.entryId);
      if (!isNaN(this.entryId)) {
        this.getAllPertes(this.entryId);
      }
    }
    this.pouletMortService.update$.subscribe(() => {
      this.getAllPertes(this.entryId); // Fetch updated losses after update trigger
    });
  }

  getAllPertes(entryId: number): void {
    this.pouletMortService.getAllPertesForEntree(this.entryId).subscribe(
      (data: any[]) => {
        this.pertes = data;
      },
      (error) => {
        console.error('Error fetching losses: ', error);
      }
    );
  }

  deletePerte(perteId: number): void {
    this.pouletMortService.deletePerteForEntree(this.entryId, perteId).subscribe(() => {
      this.pouletMortService.triggerUpdate(); // Trigger update after deleting loss
    });
  }

  async confirmDeletePerte(perteId: number): Promise<void> {
    const confirmAlert = await this.alertController.create({
      header: 'Confirmation',
      message: 'êtes vous sûr de vouloir supprimer cette perte?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.deletePerte(perteId);
          },
        },
      ],
    });
    await confirmAlert.present();
  }
}
