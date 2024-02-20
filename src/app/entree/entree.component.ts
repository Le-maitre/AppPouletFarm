import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UserentriesService } from '../userentries.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-entree',
  templateUrl: './entree.component.html',
  styleUrls: ['./entree.component.scss'],
})
export class EntreeComponent implements OnInit {
  userEntries: any[] = []; // Assuming your entries are of type 'any[]'

  constructor(
    private userentriesService: UserentriesService,
    private userService: UserService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Assuming you have the user ID available, replace 'userId' with the actual user ID
    const userId = localStorage.getItem("userId");
    this.fetchUserEntries(parseInt(userId!)); // Initial fetch of user entries
    // Subscribe to the update event to trigger updates
    this.userentriesService.update$.subscribe(() => {
      this.fetchUserEntries(parseInt(userId!)); // Fetch updated entries
    });
  }

  // Method to delete an entry
  async deleteEntry(entryId: number) {
    const userId = localStorage.getItem("userId"); // Replace with the actual user ID

    const confirmAlert = await this.alertController.create({
      header: 'Suppression',
      message: 'Are you sure you want to delete this entry?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // Do nothing when canceled
          }
        },
        {
          text: 'Yes',
          handler: () => {
            // Proceed with deletion
            this.performDeletion(parseInt(userId!), entryId);
          }
        }
      ]
    });

    await confirmAlert.present();
  }

  // Method to perform deletion after confirmation
  private performDeletion(userId: number, entryId: number) {
    this.userentriesService.deleteEntry(userId, entryId).subscribe(
      () => {
        // On successful deletion, trigger update
        this.userentriesService.triggerUpdate();
      },
      (error) => {
        console.error('Error deleting entry:', error);
        // Handle error, show error message, etc.
      }
    );
  }

  // Method to fetch user entries
  fetchUserEntries(userId: number) {
    this.userentriesService.getUserEntries(userId).subscribe(
      (entries) => {
        this.userEntries = entries; // Update userEntries with the fetched entries
      },
      (error) => {
        console.error('Error fetching entries:', error);
        // Handle error, show error message, etc.
      }
    );
  }
}
