import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss'],
})
export class DonationsComponent  implements OnInit {
  selectedTab:string='inProgress'
  constructor() { }

  ngOnInit() {}

}
