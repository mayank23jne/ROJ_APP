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
import { TranslateService } from '@ngx-translate/core';

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
  userName:string = '';
  userRole:any = '';

  constructor(
    private router: Router,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private alertController: AlertController,
    private platform: Platform,
    private ThemeService: ThemeService,
    private location: Location,
    private translate: TranslateService,
    private menu: MenuController
    
  ) { 
    this.initializeApp();
    this.translate.setDefaultLang('en'); 
    this.translate.use('en'); 
   }

  ngOnInit():void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeUrl = event.urlAfterRedirects;
        console.log(this.activeUrl);
      }
    });
    const user = localStorage.getItem('app_user');
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.name;
      this.userRole = userData.user_type;
      this.showMenu();
    } 
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


  showMenu() {
     if (this.userRole == '1') {
      this.menuList = [
        { title: 'Choose Language', desc:"Your preferred language to use Rainbows Of Joy", url: '/language', iconPath: '../assets/icon/language.svg' },
        { title: 'About us', desc:"Know more about the humble team of Rainbows Of Joy", url: '/about-us', iconPath: '../assets/icon/info.svg' },
        { title: 'Contact us', desc:"Get in touch with the team of Rainbows Of Joy", url: '/contact-info', iconPath: '../assets/icon/contact.svg' },
      ];
    } else {
      this.menuList = [
        { title: 'Home', url: '/tabs/tab2', icon: 'home' },
        // { title: 'Profile', url: '/tabs/tab3', icon: 'person' },
        // { title: 'Notification', url: '/tabs/tab1', icon: 'notifications-circle-outline' },
      ];
    }
  }

 

}
