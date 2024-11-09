import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {
  userDetails: any;

  constructor(
    private apiService: ApiService,
    private loader:LoaderService
  ) { }

  ngOnInit() {
    this.getUserDetails()
  }
  getUserDetails() {
    this.loader.showLoader();
    this.apiService.getSingleUser().subscribe({
      next: (response: any) => {
        this.userDetails = response.data;
        this.loader.hideLoader();
      },
      error: (err: any) => {
        console.error('Error fetching user details:', err);
        this.loader.hideLoader();
      }
    });
  }

  getFullAddress(): string {
    return `${this.userDetails?.address1 || ''}
            ${this.userDetails?.address2 || ''} , 
            ${this.userDetails?.area?.name || ''} , 
            ${this.userDetails?.city?.name || ''} ,
            ${this.userDetails?.district?.name || ''} ,
            ${this.userDetails?.state?.name || ''} ,
            ${this.userDetails?.pincode || ''}`.trim();
  }

}
