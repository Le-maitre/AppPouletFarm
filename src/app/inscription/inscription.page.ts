import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  userData = {
    usernom: '',
    email: '',
    password: '',
    rmdp: ''
  };

  constructor(private http: HttpClient,private alertController: AlertController, private router: Router) {}
  ngOnInit(): void {}
  async onSubmit() {
    // Check if passwords match
    if (this.userData.password !== this.userData.rmdp) {
      await this.showAlert('Error', 'Passwords do not match. Please re-enter.');
      return;
    }

    // Check if the email is valid using a simple pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.userData.email)) {
      await this.showAlert('Error', 'Please enter a valid email address.');
      return;
    }

    // Proceed with form submission logic
    console.log('Form submitted with data:', this.userData);
    // Post user data to the server
    // Post user data to the server
    this.http.post('http://localhost:8080/api/users/create', this.userData)
      .subscribe(
        (response) => {
          // Handle successful response from the server
          console.log('User created:', response);

          // Redirect to the home page upon successful registration
          this.router.navigate(['/tabs/tab1']); // Replace 'Acueil' with the appropriate path to your home page
        },
        (error) => {
          // Handle errors if the request fails
          console.error('Error creating user:', error);
          if (error && error.error && error.error.message) {
            // Check if the error contains a specific constraint violation message
            this.showAlert('Error', error.error.message);
          } else {
            // Show a generic error message if the specific error message is not available
            this.showAlert('Erreur', 'Utilisateur existe déjà .');
          }
        }
      );
  }
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}