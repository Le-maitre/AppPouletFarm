import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserentriesService } from '../userentries.service';
import { Entry } from '../entry';
import { co } from '@fullcalendar/core/internal-common';
@Component({
  selector: 'app-poussin',
  templateUrl: './poussin.component.html',
  styleUrls: ['./poussin.component.scss'],
})
export class PoussinComponent  implements OnInit {
  entry: Entry | undefined; 
  entryId: number | undefined; 
  userId: any;
  constructor(private route: ActivatedRoute, private userentriesService : UserentriesService) { }

  ngOnInit() {
    this.userId= localStorage.getItem("userId");
    // Fetch the entry information based on the route parameter
    this.route.paramMap.subscribe(params => {
      const entryId = params.get('id'); 
      localStorage.setItem("entry",entryId!);
      if (entryId !== null) {
        this.entryId = parseInt(entryId!); // Convert the entryId to a number
        this.userentriesService.getEntryById(this.entryId,parseInt(this.userId!))
          .subscribe((entry) => {
            this.entry = entry;
          });
      }
    });
  }
}