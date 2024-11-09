import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private userTypeSource = new BehaviorSubject<string>('');
  userType$ = this.userTypeSource.asObservable();
  private root = document.documentElement;

  constructor() {
    const savedUserType = localStorage.getItem('user_type') || '';
    this.setDynamicCSS(savedUserType);
    this.userTypeSource.next(savedUserType);
  }

  getUserType(): Observable<string> {
    return this.userType$;
  }

  get currentUserType(): string {
    return this.userTypeSource.value;
  }

  setUserType(type: string) {
    localStorage.setItem('user_type', type);
    this.userTypeSource.next(type);
    this.setDynamicCSS(type);
  }

  private setDynamicCSS(type: string) {
    if (type === 'donor') {
      this.root.style.setProperty('--main-color', '#F04E75');
      this.root.style.setProperty('--main-background-color', '#ffe5e5');
    } else {
      this.root.style.setProperty('--main-color', '#64c1e8');
      this.root.style.setProperty('--main-background-color', '#e5f0ff');
    }
  }
}
