import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss'],
})
export class OrganizationDetailComponent  implements OnInit {
  receivedData:any;
  product_count:number = 1;
  images: string[] = [
    'assets/images/slide-1.jpg',
    'assets/images/slide-2.jpg',
    'assets/images/slide-1.jpg',
  ]; // Replace with your image paths
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.receivedData = navigation?.extras?.state?.['data'];
    console.log(this.receivedData);
   }

  ngOnInit() {
   console.log(this.receivedData.dataContainer.Description);
   
  }
  proceed_donation(){
    const dataToSend = { item_count: this.product_count,org_id:1 }; 
    this.router.navigate(['/tabs/tab1/donation-checkout'], { 
      state: { data: dataToSend } 
    });
  }
  increment() {
    if (this.product_count ) {
      this.product_count += 1;
    }
  }
  decrement() {
   
    if (this.product_count > 1) {
      this.product_count -= 1;
    }
  }

}
