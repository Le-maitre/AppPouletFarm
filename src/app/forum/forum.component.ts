import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from '../user';
import { ForumService } from '../forum.service';
import { Router } from '@angular/router';
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
    // Déclaration des variables nécessaires
newComment: { [key: string]: string } = {};
commentSectionsOpen: { [key: string]: boolean } = {};

// Méthodes pour gérer les commentaires
toggleCommentSection(post: any) {
  this.commentSectionsOpen[post.id] = !this.commentSectionsOpen[post.id];
}

isCommentSectionOpen(post: any): boolean {
  return this.commentSectionsOpen[post.id] || false;
}

addComment(post: any) {
  const commentText = this.newComment[post.id];
  // Ajoutez la logique pour sauvegarder le commentaire dans la publication correspondante (post)
  // post.comments.push({ author: loggedInUser, text: commentText });
  // Réinitialisez le champ de texte du commentaire
  this.newComment[post.id] = '';
}

  
    constructor(private forumService: ForumService,private alertController: AlertController, private router: Router) {}
  
    ngOnInit() {
      this.forumPosts = this.forumService.forumPosts;
    }
    redirectPublication(postId: number) {
      this.router.navigate(['/publication', postId]); // Assurez-vous d'avoir une route correspondante avec le paramètre postId
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
  