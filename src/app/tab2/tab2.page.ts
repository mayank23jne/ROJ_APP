import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { App } from '@capacitor/app';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
register()

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{
  dashboardData: any=[];

  constructor(
    private apiService: ApiService,
    private loader: LoaderService,
    private toast: ToastService,
    private alertController: AlertController,
    private platform: Platform,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.router.url === '/tabs/tab2') {
        // this.showExitConfirm();
      } else {
        this.navCtrl.back();
      }      
    }); }
  
  ngOnInit() {

  }

  // async showExitConfirm() {
  //   const alert = await this.alertController.create({
  //     header: 'Exit App',
  //     message: 'Are you sure you want to exit the app?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {

  //         },
  //       },
  //       {
  //         text: 'Exit',
  //         handler: () => {
  //           App.exitApp(); // Exit the app
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }

  // ionViewWillEnter() {
  //   this.fetchData();
  // }
  
  // fetchData() {
  //   this.loader.showLoader();
  //   this.apiService.dashboard().subscribe(
  //      (data) => {
  //         if (data.status === 'success') {
  //           this.dashboardData = data.result;
  //         } else {
  //           this.toast.showToast('error', data.message);
  //         }
  //         this.loader.hideLoader();
  //       },
  //      (error) => {
  //           this.toast.showToast('error', 'Failed to fetch data');
  //           this.loader.hideLoader();
          
  //       }
  //   );
  // }
  

}
