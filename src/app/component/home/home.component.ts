import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  userType: string = '';
  searchText:string = '';
  constructor(
    private themeService:ThemeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.themeService.getUserType().subscribe(type => {
      this.userType = type;
    });
  }

  orgListPage(){
    const dataToSend = { search_text: this.searchText }; 
    this.router.navigate(['/tabs/tab1/donor-organizations-list'], { 
      state: { data: dataToSend } 
    });
  }

}
