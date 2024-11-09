import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit{
  userType: string = '';
  constructor(
    private themeService: ThemeService,
    private route:Router
  ) { }
  ngOnInit() {
    this.themeService.getUserType().subscribe(type => {
      this.userType = type;
    })
  }
  ionViewWillEnter() {
    if (this.userType == 'donor') {
      this.route.navigate(['tabs/tab4/donor-profile']);
    } else {
      this.route.navigate(['tabs/tab4/organization-profile']);
    }
  }
}
