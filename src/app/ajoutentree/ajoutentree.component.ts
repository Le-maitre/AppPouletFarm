import { Component, OnInit } from '@angular/core';
import { UserentriesService } from '../userentries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajoutentree',
  templateUrl: './ajoutentree.component.html',
  styleUrls: ['./ajoutentree.component.scss'],
})
export class AjoutentreeComponent  implements OnInit {
  formData: any = {};
  successMessage: string = ''; // Variable to hold the success message

  constructor(
    private userentriesService: UserentriesService,
    private router: Router
  ) {}

  addEntry() {
    const userId = 1; // Replace with the actual user ID
  
    if (!this.isFormValid()) {
      console.error('Form is not valid. Please fill in all mandatory fields.');
      return;
    }
  
    this.userentriesService.addEntry(userId, this.formData).subscribe(
      (response) => {
        console.log('Entry added successfully:', response);
        this.successMessage = 'Entrée ajoutée avec succès !'; // Set success message
  
        setTimeout(() => {
          this.router.navigate(['../entree']); // Ensure this navigation works
        }, 2000); // Redirect after 2 seconds (adjust as needed)
      },
      (error) => {
        console.error('Error adding entry:', error);
        // Handle error: Show an error message to the user or perform appropriate actions.
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
