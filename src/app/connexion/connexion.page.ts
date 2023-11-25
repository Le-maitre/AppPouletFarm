import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private navCtrl: NavController) {}

  ngOnInit() {
  }
  login() {
    this.userService.loginUser(this.user).subscribe(
      (response) => {
         // Authentication successful, navigate to home page or desired route
         this.navCtrl.navigateRoot('/tabs/tab1'); // Change '/home' to your home route
        },
        (error) => {
          // Handle authentication failure - show alert or error message
          console.error('Authentication failed', error);
          // For example, show an alert
          // You can use Ionic's AlertController to display an error message to the user
          // ...
        }
      );
    }


}
