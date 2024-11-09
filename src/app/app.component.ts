import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { ApiService } from './services/api.service';
import { LoaderService } from './services/loader.service';
import { ToastService } from './services/toast.service';
import { StatusBar, Style } from '@capacitor/status-bar';
import { AlertController, Platform } from '@ionic/angular';
import { Location } from '@angular/common'; 
import { MenuController } from '@ionic/angular';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  menuList: any = [];
  activeUrl: string = '';
  userType: string = '';
  isLoading = false;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private alertController: AlertController,
    private platform: Platform,
    private ThemeService: ThemeService,
    private location: Location,
    private menu: MenuController
    
  ) { this.initializeApp(); }

  ngOnInit():void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeUrl = event.urlAfterRedirects;
        console.log(this.activeUrl);
      }
    });
    // const user = localStorage.getItem('user');
    // if (user) {
    //   const userData = JSON.parse(user);
    //   this.userName = userData.first_name;
    //   this.userRole = userData.role_name;
    //   this.showMenu();
    // } 
  
    this.setStatusBar();
    this.menu.enable(true);
    this.ThemeService.getUserType().subscribe(theme => {
      this.userType = theme;
    });
    this.loaderService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
      console.log('loader' , loading)
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.checkNetworkStatus();
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.location.back();
      });
    });
  }
async checkNetworkStatus() {
    // Get initial status of network
    const status = await Network.getStatus();
    if (!status.connected) {
      this.showAlert('No Internet Connection', 'Please check your connection and try again.');
    }

    // Listen for network changes
    Network.addListener('networkStatusChange', (status) => {
      if (!status.connected) {
        this.showAlert('No Internet Connection', 'You are offline. Please check your connection.');
      }
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  
 async setStatusBar() {
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: '#ffffff' });
  }
  

  logout() {
    // Handle logout logic here
    localStorage.removeItem('app_user');
    localStorage.removeItem('user_type');
    this.router.navigate(['login']);
    this.toastService.showToast('success', 'Logged out successfully!');
  }


  // showMenu() {
  //    if (this.userRole == 'Admin') {
  //     this.menuList = [
  //       { title: 'Home', url: '/tabs/tab2', icon: 'home' },
  //       { title: 'Profile', url: '/tabs/tab3', icon: 'person' },
  //       { title: 'Notification', url: '/tabs/tab1', icon: 'notifications-circle-outline' },
  //       { title: 'Explore', url: '/explore', icon: 'compass' },
  //       { title: 'Contact', url: '/contact', icon: 'call' },
  //       { title: 'Help', url: '/help', icon: 'help-circle' },
  //       { title: 'Settings', url: '/settings', icon: 'settings' },
  //     ];
  //   } else {
  //     this.menuList = [
  //       { title: 'Home', url: '/tabs/tab2', icon: 'home' },
  //       { title: 'Profile', url: '/tabs/tab3', icon: 'person' },
  //       { title: 'Notification', url: '/tabs/tab1', icon: 'notifications-circle-outline' },
  //     ];
  //   }
  // }

 

}
