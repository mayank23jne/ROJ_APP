import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShareComponent } from '../share/share.component';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss'],
})
export class DonationsComponent  implements OnInit {
  selectedTab:string='inProgress'
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  async share(){
    let title = 'Sri Vidhyas Centre For The Special Children';
    let desc = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no';
    const modal = await this.modalCtrl.create({
      component: ShareComponent,
      initialBreakpoint: 0.3, 
      breakpoints: [0, 0.3, 1], 
      componentProps: {
        title:title,
        desc:desc,
      },
      cssClass: 'custom-height-filter-modal' 
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      
      
    });
    return await modal.present();
  }
  
}
