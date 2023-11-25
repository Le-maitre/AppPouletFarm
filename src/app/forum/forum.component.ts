import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from '../user';
import { ForumService } from '../forum.service';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent  implements OnInit {
    userLoggedIn: User = new User('Kaly Diallo', 'exemple@email.com', 'motdepasse'); // Exemple d'utilisateur connecté
    activeMenu: string | null = null;
    userLoggedInName: string = 'Kaly Diallo'; // Nom de l'utilisateur connecté
    forumPosts: any[] = []; // Déclaration de la propriété forumPosts
  
    constructor(private forumService: ForumService,private alertController: AlertController) {}

    ngOnInit() {
      this.forumPosts = this.forumService.forumPosts;
    }
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
  
    hideOptionsMenu() {
      this.activeMenu = null;
    }
  
    deletePost(post: any) {
      if (post.author === this.userLoggedInName) {
        this.forumPosts = this.forumPosts.filter(p => p !== post);
      } else {
        console.log('Vous n\'êtes pas autorisé à supprimer cette publication.');
      }
      this.hideOptionsMenu();
    }
  
    toggleLike(post: any) {
      if (this.isLikedByUser(post)) {
        post.likesBy = post.likesBy.filter((user: string) => user !== this.userLoggedInName);
        post.likes--;
      } else {
        post.likesBy.push(this.userLoggedInName);
        post.likes++;
      }
    }
  
    isLikedByUser(post: any): boolean {
      return post.likesBy.includes(this.userLoggedInName);
    }
    
  }
  