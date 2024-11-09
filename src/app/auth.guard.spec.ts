import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should return false and navigate to login if not authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(authGuard.canActivate(null, null)).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });

  it('should return true if authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue('app_user');
    expect(authGuard.canActivate(null, null)).toBeTrue();
  });
});
