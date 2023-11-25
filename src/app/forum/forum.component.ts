import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent  implements OnInit {

  activeMenu: string | null = null;

  // Sample data, replace with your actual data
  forumPosts = [
    { id: '1', author: 'Sory Sangare', content: 'Mes poussins de 4 jours...', image: '../../assets/forumm.png', likes: 23 },
    { id: '1', author: 'Sory Sidibe', content: 'Mes poussins de 24 jours...', image: '../../assets/form2.png', likes: 24 },
    // Add more posts as needed
  ];

  constructor(private alertController: AlertController) {}
  ngOnInit(): void {
  }

  // Method to show options menu
  async showOptionsMenu(post: any) {
    this.activeMenu = post.id;
    const alert = await this.alertController.create({
      header: 'Options',
      buttons: [
        {
          text: 'Supprimer la publication',
          handler: () => {
            this.deletePost(post);
          },
        },
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            this.hideOptionsMenu();
          },
        },
      ],
    });
    await alert.present();
  }

  // Method to hide options menu
  hideOptionsMenu() {
    this.activeMenu = null;
  }

  // Method to delete a post
  deletePost(post: any) {
    // Add logic to delete the post, you might want to confirm with another alert
    this.forumPosts = this.forumPosts.filter(p => p !== post);
    this.hideOptionsMenu();
  }
}
