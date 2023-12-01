import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserentriesService } from '../userentries.service';
import { Entry } from '../entry';
@Component({
  selector: 'app-modifierentree',
  templateUrl: './modifierentree.component.html',
  styleUrls: ['./modifierentree.component.scss'],
})
export class ModifierentreeComponent  implements OnInit {
  entry: Entry = {
    id: 1,
    nom: 'Example Entry',
    nombrePoussins: 750,
    dateEntree: new Date(),
    dateSortie: new Date(),
    // Other properties if present
  };
 userid:any;
  constructor(private route: ActivatedRoute, private userentriesService: UserentriesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = 1; // Replace this with your logic to get the user ID
      const entryId = +params['id']; // Convert 'id' to a number
      this.getEntryDetails(userId, entryId);
    });
  }
 
  getEntryDetails(userId: number, entryId: number): void {
    this.userid = localStorage.getItem("userid")
    this.userentriesService.getEntryById(entryId,parseInt(this.userid!)).subscribe(
      entry => {
        this.entry = entry;
      },
      error => {
        console.error('Error fetching entry details:', error);
      }
    );
  }

  updateEntry(): void {
    const userId = 1; // Replace with the actual user ID
    this.userentriesService.updateEntry(userId, this.entry).subscribe(
      updatedEntry => {
        // Handle success or redirect to the entry list
      },
      error => {
        console.error('Error updating entry:', error);
      }
    );
  }
}