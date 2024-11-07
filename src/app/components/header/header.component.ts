import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userName: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.userName = user ? user.username : null; 
    });
    console.log('userName', this.userName);
  
  }

  activeItem: string = 'home';

  setActive(item: string) {
    this.activeItem = item;
  }

  isDisabled(item: string): boolean {
    return item === 'disabled';
  }
  logout() {
    this.router.navigateByUrl('login');
    console.log('User logged out');
  }
}
