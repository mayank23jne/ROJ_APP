import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
register()

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  date: any = '07/12/2024';
  userTypeDonor: boolean = true;
  isNewProductRequestVisible= false;
  
  constructor(
    private router: Router
  ) { }
}
