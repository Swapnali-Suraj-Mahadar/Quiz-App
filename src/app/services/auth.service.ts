// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  username: string;
  // Add other properties if necessary
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userSubject = new BehaviorSubject<User | null>(null);
  currentUser = this.userSubject.asObservable();

  login(username: string) {
  
    const user: User = { username }; 
    this.userSubject.next(user);
  }

  logout() {
    this.userSubject.next(null);
  }
  
}
