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
  userId:any;
  entry: Entry | undefined; // Define a variable to hold the entry ID
  entryId: number | undefined; // Variable to hold the entry name
  constructor(private route: ActivatedRoute,private userentriesService : UserentriesService) {}
  ngOnInit() {
    this.userId= localStorage.getItem("userId");
    // Fetch the entry information based on the route parameter
    this.route.paramMap.subscribe(params => {
      const entryId = params.get('id'); 
      console.log("entryid============",entryId)
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