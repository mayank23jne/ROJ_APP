import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-checkout-final',
  templateUrl: './checkout-final.component.html',
  styleUrls: ['./checkout-final.component.scss'],
})
export class CheckoutFinalComponent  implements OnInit {
  delivery_date:any = "";
  donationData:any;
  delivery_type:string = "";
  delivery_time_from:any = "";
  delivery_time_to:any = "";
  constructor(private modalCtrl: ModalController,private navParams: NavParams) { }

  ngOnInit() {

    this.donationData = this.navParams.get('donationData');
    console.log(this.donationData);
    this.delivery_type = this.donationData.deliveryType;
   
  }

  close(){
    this.modalCtrl.dismiss();
  }
  editAddress() {
    console.log('Edit Address clicked!');
  }

  chooseAnotherAddress() {
    console.log('Choose Another Address clicked!');
  }

  useCurrentLocation() {
    console.log('Use Current Location clicked!');
  }

  payAndDonate() {
    console.log('Pay & Donate clicked!');
  }

}
