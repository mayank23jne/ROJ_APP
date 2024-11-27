import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {
   orgDetails: any;

  constructor(
    private apiService: ApiService,
    private loader:LoaderService
  ) { }

  ngOnInit() {
    this.getOrgDetails()
  }
  getOrgDetails() {
    this.loader.showLoader();
    this.apiService.getSingleOrg().subscribe({
      next: (response: any) => {
        this.orgDetails = response.data;
        this.setOrgData(response.data);
        this.loader.hideLoader();
        console.log('org',response)
      },
      error: (err: any) => {
        console.error('Error fetching user details:', err);
        this.loader.hideLoader();
      }
    });
  }
  setOrgData(data: any) {
    this.orgDetails.photos = data.photos.split(',');
    console.log(this.orgDetails.photos);
  }

  getFullAddress(): string {
    return `${this.orgDetails?.address1 || ''}
            ${this.orgDetails?.address2 || ''} , 
            ${this.orgDetails?.area?.name || ''} , 
            ${this.orgDetails?.city?.name || ''} ,
            ${this.orgDetails?.district?.name || ''} ,
            ${this.orgDetails?.state?.name || ''} ,
            ${this.orgDetails?.pincode || ''}`.trim();
  }

}
