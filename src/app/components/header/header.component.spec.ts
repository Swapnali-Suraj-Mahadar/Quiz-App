import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

class MockAuthService {
  currentUser = of({ username: 'testUser' });
}

class MockRouter {
  navigateByUrl(url: string) {
    // Mock implementation for navigation
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set userName on init', () => {
    expect(component.userName).toBe('testUser');
  });

  it('should set active item correctly', () => {
    component.setActive('about');
    expect(component.activeItem).toBe('about');
  });

  it('should return false for isDisabled with "home"', () => {
    expect(component.isDisabled('home')).toBeFalse();
  });

  it('should log out and navigate to login', () => {
    spyOn(router, 'navigateByUrl');
    component.logout();
    expect(router.navigateByUrl).toHaveBeenCalledWith('login');
    // Optionally check the console log if necessary
  });
});
