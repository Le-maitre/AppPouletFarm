import { Component, OnInit } from '@angular/core';
import { UserentriesService } from '../userentries.service';
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'date-fns';

@Component({
  selector: 'app-ajoutentree',
  templateUrl: './ajoutentree.component.html',
  styleUrls: ['./ajoutentree.component.scss'],
})
export class AjoutentreeComponent  implements OnInit {
  formData: any = {};
  userEntries: any[] = []; 
  successMessage: string = ''; // Variable to hold the success message

  constructor(
    private userentriesService: UserentriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  addEntry() {
    const userId = localStorage.getItem("userId"); // Replace with the actual user ID

    if (!this.isFormValid()) {
      console.error('Form is not valid. Please fill in all mandatory fields.');
      return;
    }
  
    this.userentriesService.addEntry(parseInt(userId!), this.formData).subscribe(
      (response) => {
        console.log('Entry added successfully:', response);
        this.successMessage = 'Entrée ajoutée avec succès !'; // Set success message
        this.fetchUserEntries(parseInt(userId!));
        this.router.navigate(['./tabs/tab1/entree']);
        setTimeout(() => {
         // Ensure this navigation works
        }, 2000); // Redirect after 2 seconds (adjust as needed)
      },

    //   setTimeout(() => {
    //     // Rafraîchir la page après l'ajout réussi en naviguant vers la même page
    //     this.router.navigateByUrl('/tabs/tab1/entree', { skipLocationChange: true }).then(() => {
    //       this.router.navigate([this.route.snapshot.url.join('/')]);
    //     });
    //   }, 2000); // Rediriger après 2 secondes (ajustez si nécessaire)
    // },
      (error) => {
        console.error('Error adding entry:', error);
        // Handle error: Show an error message to the user or perform appropriate actions.
      }
    );
  }

async  fetchUserEntries(userId: number) {
  await  this.userentriesService.getUserEntries(userId).subscribe(
      (entries) => {
        this.userEntries = entries; // Update userEntries with the fetched entries
      },
      (error) => {
        console.error('Error fetching entries:', error);
        // Handle error, show error message, etc.
      }
      );
    }
  
  isFormValid(): boolean {
    return (
      this.formData.nom &&
      this.formData.nombrePoussins &&
      this.formData.dateEntree &&
      this.formData.dateSortie
    );
  }
  

  ngOnInit() {}

}
