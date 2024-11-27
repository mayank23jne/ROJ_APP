import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent  implements OnInit {

  constructor(private modalCtrl: ModalController,private navParams: NavParams) { }

  ngOnInit() {}
  
  close(){
    this.modalCtrl.dismiss();
  }
}
