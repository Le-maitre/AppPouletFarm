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
export class ForumComponent implements OnInit {
  userLoggedIn: User = new User('Kaly Diallo', 'example@email.com', 'password');
  activeMenu: string | null = null;
  userLoggedInName: string = 'Kaly Diallo';
  forumPosts: any[] = [];
  newComment: { [key: string]: string } = {};
  commentSectionsOpen: { [key: string]: boolean } = {};

  constructor(
    private forumService: ForumService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    // Reverse the array to display the latest posts first
    this.forumPosts = this.forumService.forumPosts.slice().reverse();
  }

  redirectPublication(postId: number) {
    this.router.navigate(['/publication', postId]);
  }

  async showOptionsMenu(post: any) {
    this.activeMenu = post.id;
    const alert = await this.alertController.create({
      header: 'Options',
      buttons: [
        {
          text: 'Delete Post',
          handler: () => {
            this.deletePost(post);
          },
        },
        {
          text: 'Cancel',
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
      console.log('You are not authorized to delete this post.');
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

  toggleCommentSection(post: any) {
    this.commentSectionsOpen[post.id] = !this.commentSectionsOpen[post.id];
  }

  isCommentSectionOpen(post: any): boolean {
    return this.commentSectionsOpen[post.id] || false;
  }

  addComment(post: any) {
    const commentText = this.newComment[post.id];
    // Add logic to save the comment in the corresponding post
    // post.comments.push({ author: loggedInUser, text: commentText });
    // Reset the comment text field
    this.newComment[post.id] = '';

    // Assuming you want the newly commented post to move to the top
    this.movePostToTop(post);
  }

  private movePostToTop(post: any) {
    // Remove the post from its current position
    this.forumPosts = this.forumPosts.filter(p => p !== post);
    // Add the post at the beginning of the array
    this.forumPosts.unshift(post);
  }
}
