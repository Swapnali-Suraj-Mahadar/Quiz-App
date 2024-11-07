import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    // Mocking user data
    spyOn(component, 'loadUserData').and.returnValue(of([
      { emailId: 'test@example.com', password: 'password123', userName: 'Test User' }
    ]));
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.userLoginForm).toBeTruthy();
    expect(component.userLoginForm.get('email')).toBeTruthy();
    expect(component.userLoginForm.get('password')).toBeTruthy();
  });

  it('should require email and password fields', () => {
    const emailControl = component.userLoginForm.get('email');
    const passwordControl = component.userLoginForm.get('password');

    emailControl?.setValue('');
    passwordControl?.setValue('');

    expect(emailControl?.valid).toBeFalse();
    expect(passwordControl?.valid).toBeFalse();
  });

  // it('should navigate to categories on successful login', () => {
  //   component.userLoginForm.setValue({ email: 'test@example.com', password: 'password123' });
  //   component.onLogin();
  //   expect(authService.login).toHaveBeenCalledWith('Test User');
  //   expect(router.navigateByUrl).toHaveBeenCalledWith('categories');
  // });

  it('should alert when login credentials are incorrect', () => {
    const alertSpy = spyOn(window, 'alert');
    component.userLoginForm.setValue({ email: 'wrong@example.com', password: 'wrongpassword' });
    component.onLogin();
    expect(alertSpy).toHaveBeenCalledWith('user name or pssword is wrong');
  });

  it('should alert if user data is not present', () => {
    const alertSpy = spyOn(window, 'alert');
    component.userDetails = null; // Simulate no user data
    component.userLoginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.onLogin();
    expect(alertSpy).toHaveBeenCalledWith('User is not present');
  });
});
