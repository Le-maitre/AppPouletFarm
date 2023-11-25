export class User {
    id!: number;
    usernom: string;
    email: string;
    password: string;
  
    constructor( username: string, email: string, password: string) {
      this.usernom = username;
      this.email = email;
      this.password = password;
    }
  }

