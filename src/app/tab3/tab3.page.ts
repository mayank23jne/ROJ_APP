import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  userType: string = '';
  constructor(
    private route: Router,
    private themeService:ThemeService
  ) {}

  ngOnInit() {
   this.themeService.getUserType().subscribe(type => {
      this.userType = type;
    });
  }
  ionViewWillEnter() {
      if (this.userType === 'donor') {
        this.route.navigate(['tabs/tab3/donor-donation']);
      } else {
         this.route.navigate(['tabs/tab3/organization-donation']);
      }
   }
  

}
