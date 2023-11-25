import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserentriesService } from '../userentries.service';
import { Entry } from '../entry';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent  implements OnInit {

  entry: Entry | undefined; // Define a variable to hold the entry ID
  entryId: number | undefined; // Variable to hold the entry name
  constructor(private route: ActivatedRoute,private userentriesService : UserentriesService) {}
  ngOnInit() {
    // Fetch the entry information based on the route parameter
    this.route.paramMap.subscribe(params => {
      const entryId = params.get('id'); // Retrieve the entry ID
      if (entryId !== null) {
        this.entryId = parseInt(entryId, 10); // Convert the entryId to a number
        this.userentriesService.getEntryById(this.entryId)
          .subscribe((entry) => {
            this.entry = entry; // Assign the entry received from service
          });
      }
    });
  }
}