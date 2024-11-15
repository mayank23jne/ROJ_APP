import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  userType: string = '';
  constructor(
    private themeService:ThemeService
  ) { }

  ngOnInit() {
    this.themeService.getUserType().subscribe(type => {
      this.userType = type;
    });
  }

}
