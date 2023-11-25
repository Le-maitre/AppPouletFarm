import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private user1: User | undefined;
  constructor() { }
  setUser(user:User){
    this.user1=user;
  }
  getUser():User|undefined{
   return this.user1;
  }
}
