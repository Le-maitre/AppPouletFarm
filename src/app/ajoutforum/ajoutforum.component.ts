import { Component, OnInit } from '@angular/core';
import { ForumService } from  '../forum.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajoutforum',
  templateUrl: './ajoutforum.component.html',
  styleUrls: ['./ajoutforum.component.scss'],
})
export class AjoutforumComponent  implements OnInit {
  ngOnInit(): void {
  }
  constructor(private forumService: ForumService, private router: Router, ) {}

  publishPost() {
    const newPost = {
      author: 'Kaly Diallo',
      content: this.description,
      image: this.selectedImage,
      likes: 0,
      likesBy: []
    };

    this.forumService.addPost(newPost);
    this.forumService.triggerUpdate(); // Trigger update after adding entry
    this.router.navigate(['./tabs/tab1/forum']);
    setTimeout(() => {
      // Ensure this navigation works
    }, 2000); // Redirect after 2 s
  }
  selectedImage: string | ArrayBuffer | null = null;
  description: string = '';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}