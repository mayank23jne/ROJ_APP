import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CheckoutFinalComponent } from '../checkout-final/checkout-final.component';

@Component({
  selector: 'app-donation-checkout',
  templateUrl: './donation-checkout.component.html',
  styleUrls: ['./donation-checkout.component.scss'],
})
export class DonationCheckoutComponent  implements OnInit {

  deliveryType:string = "";
  org_id:number = 0 ;
  product_count:number = 1;
  constructor(private router: Router,private modalCtrl:ModalController) { }

  ngOnInit() {}

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
  deliveryTypeChange(){

    console.log(this.deliveryType);
  
  }
  
  // Decrement quantity function

  async proceed(){
  
    const dataToSend = { deliveryType: this.deliveryType ,org_id:this.org_id,product_count: this.product_count }; 
    const modal = await this.modalCtrl.create({
      component: CheckoutFinalComponent,
      initialBreakpoint: 0.3, 
      breakpoints: [0, 0.3, 1], 
      componentProps: {
        donationData:dataToSend,
      },
      cssClass: 'custom-height-filter-modal' 
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      
      
    });
    return await modal.present();
  }

}
