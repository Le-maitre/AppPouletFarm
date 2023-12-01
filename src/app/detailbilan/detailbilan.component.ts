import { Component, OnInit } from '@angular/core';
import { TacheBilan } from '../tachebilan';
import { ActivatedRoute } from '@angular/router';
import { TacheBilanService } from '../tachebilan.service';

@Component({
  selector: 'app-detailbilan',
  templateUrl: './detailbilan.component.html',
  styleUrls: ['./detailbilan.component.scss'],
})
export class DetailbilanComponent  implements OnInit {
  tacheBilans: TacheBilan[] = [];
  bilanPrevisionId: number | undefined;

  constructor(private route: ActivatedRoute, private tacheBilanService: TacheBilanService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const bilanPrevisionId = params.get('id'); 
      console.log("bilanid====",bilanPrevisionId)
      localStorage.setItem("bilanPrevisionId", bilanPrevisionId!);
      if (bilanPrevisionId !== null) {
        this.bilanPrevisionId = parseInt(bilanPrevisionId!);

        // Utilisation du service pour récupérer les tâches associées au bilan
        this.tacheBilanService.getTacheBilansByBilanPrevisionId(this.bilanPrevisionId)
          .subscribe((tacheBilans) => {
            this.tacheBilans = tacheBilans;
          });
      }
    });
  }
}