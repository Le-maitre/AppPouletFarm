import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ForumService {
  forumPosts = [
    { id: '1', author: 'Sory Sangare', content: 'Mes poussins de 4 jours...', image: '../../assets/forumm.png', likes: 23, likesBy: [] as string[] },
      { id: '2', author: 'Fomba Soumana', content: 'Mes poussins de 24 jours...', image: '../../assets/form2.png', likes: 24, likesBy: [] as string[] },
  ];


  constructor() { }
  addPost(post: any) {
    this.forumPosts.push(post);
  }
}
