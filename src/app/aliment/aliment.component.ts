import { Component, OnInit } from '@angular/core';
import { Aliment } from '../aliment';
import { AlimentService } from '../aliment.service';

@Component({
  selector: 'app-aliment',
  templateUrl: './aliment.component.html',
  styleUrls: ['./aliment.component.scss'],
})
export class AlimentComponent implements OnInit {
  aliments: Aliment[] = [];
  entryId: any;

  constructor(private alimentService: AlimentService) { }

  ngOnInit() {
    this.entryId = localStorage.getItem('entry');
    if (this.entryId !== null) {
      this.entryId = parseInt(this.entryId);
      if (!isNaN(this.entryId)) {
        this.getAlimentsForEntry(this.entryId);
      }
    }
  }

  getAlimentsForEntry(entryId: number): void {
    this.alimentService.getAlimentsByEntreeId(entryId).subscribe((data: Aliment[]) => {
      this.aliments = data;
    });
  }
}
