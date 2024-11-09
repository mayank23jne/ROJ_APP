import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  currentUrl: string = ''
  @Output() routeName:any;
  constructor(
    private navContorller: NavController,
    private Route:Router
  ) { }

  ngOnInit() {
    this.currentUrl = this.Route.url;
    this.routeName = this.Route.url.split('/')[1];
  }
  back() {
    this.navContorller.back();
  }

}
