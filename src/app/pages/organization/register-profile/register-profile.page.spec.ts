import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterProfilePage } from './register-profile.page';

describe('RegisterProfilePage', () => {
  let component: RegisterProfilePage;
  let fixture: ComponentFixture<RegisterProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
