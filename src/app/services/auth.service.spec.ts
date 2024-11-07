import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with currentUser as null', (done: DoneFn) => {
    service.currentUser.subscribe(user => {
      expect(user).toBeNull();
      done();
    });
  });

  it('should set the user when login is called', (done: DoneFn) => {
    const username = 'testUser';
    service.currentUser.subscribe(user => {
      if (user) {
        expect(user.username).toEqual(username);
        done();
      }
    });
    service.login(username);
  });

  it('should set currentUser to null when logout is called', (done: DoneFn) => {
    const username = 'testUser';
    service.login(username); // First log in

    service.currentUser.subscribe(user => {
      if (user === null) {
        expect(user).toBeNull();
        done();
      }
    });

    service.logout(); // Then log out
  });
});
