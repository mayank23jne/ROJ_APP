import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {
  userDetails: any;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getUserDetails()
  }
  getUserDetails() {
    this.apiService.getSingleUser().subscribe((response: any) => {
      this.userDetails = response.data;
    });
  }

}
