import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private updateEvent = new Subject<void>();

  update$ = this.updateEvent.asObservable();

  forumPosts = [
    { id: '1', author: 'Sory Sangare', content: 'Mes poussins de 4 jours...', image: '../../assets/forumm.png', likes: 3, likesBy: [] as string[] },
      { id: '2', author: 'Fomba Soumana', content: 'Mes poussins de 24 jours...', image: '../../assets/form2.png', likes: 1, likesBy: [] as string[] },
  ];


  constructor() { }
  triggerUpdate() {
    this.updateEvent.next();
  }
  
  addPost(post: any) {
    this.forumPosts.push(post);
  }
}
