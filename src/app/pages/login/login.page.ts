import { Component, OnInit, Renderer2} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { App } from '@capacitor/app';
import { AlertController, Platform ,MenuController, NavController} from '@ionic/angular';
import { ThemeService } from 'src/app/services/theme.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  selectedTab: string = 'login'
  activeTab: string ='login';
  userName: string = '';
  passWord: string = '';
  orgName: string = '';
  emailPhone: string = '';
  orgPassword: string = '';
  orgConfirmPassword: string = '';
  showPassword: boolean = false;
  orgType: number = 2;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastService: ToastService,
    private loader: LoaderService,
    private alertController: AlertController,
    private platform: Platform,
    private renderer: Renderer2,
    private menu: MenuController,
    private themeService: ThemeService,
    private navCtrl: NavController
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
       this.handleBackButton();
    });
  }
  ngOnInit() {
     this.menu.enable(false);
  }
  selectedTabs(tab: string) {
    this.activeTab = tab;
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  ngOnDestroy() {
    this.menu.enable(true);
  }
  login(loginForm: NgForm) {
    this.loader.showLoader();
    if (loginForm.valid) {
      
      this.apiService.login(loginForm.value).pipe(
            catchError(error => {
             this.toastService.showToast('error', 'An error occurred. Please try again.');
                return of(null);
        })
      ).subscribe((res) => {
        if (res?.status) {
          this.setUserDetails(res.data)
        } else {
          this.toastService.showToast('error', res?.message);
        }
        this.loader.hideLoader();
      });
    }
  }

  setUserDetails(res:any) {
      localStorage.setItem('app_user', JSON.stringify(res));
      if (res.user_type == 1) {
        this.themeService.setUserType('donor')
      } else {
        this.themeService.setUserType('organization')
      }
      this.toastService.showToast('success', 'Logged in successfully.');
      this.menu.enable(true);
      this.router.navigate(['tabs/tab1']);
  }

  handleBackButton() {
    const currentUrl = this.router.url;
    if (currentUrl === '/login') {
       this.showExitConfirm();
    }else{
      this.navCtrl.back();
    } 
  }

  async showExitConfirm() {
    const alert = await this.alertController.create({
      header: 'Exit App',
      message: 'Are you sure you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Exit',
          handler: () => {
            App.exitApp(); // Exit the app
          },
        },
      ],
    });

    await alert.present();
  }

  register(regForm: NgForm) {
    if (regForm.valid) {
      this.loader.showLoader();
  
      this.apiService.register(regForm.value).pipe(
        catchError((error: HttpErrorResponse) => {
          // Pass the error as an observable to handle it in subscribe
          return of(error);
        })
      ).subscribe((res) => {
        // If res is an instance of HttpErrorResponse, it's an error
        if (res instanceof HttpErrorResponse) {
          if (res.status === 422) {
            this.toastService.showToast('error', 'Validation error: ' + (res.error.message || 'Invalid data'));
          } else {
            this.toastService.showToast('error', 'An error occurred. Please try again.');
          }
        } else if (res?.status) {
          // Handle success case
          this.toastService.showToast('success', 'Registration successful!');
          this.router.navigate(['/register-profile-organization']);
        } else {
          // Handle other failure cases
          this.toastService.showToast('error', res?.message || 'Registration failed.');
        }
        this.loader.hideLoader();
      });
    } else {
      this.toastService.showToast('error', 'Please fill out the form correctly.');
    }
  }
  
}
