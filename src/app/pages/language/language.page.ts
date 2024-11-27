import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
  selectedLanguage: string = 'en'; 
  change_page:boolean = false;
  constructor(
    private translate: TranslateService,
    private routing: Router,
  ) {
    this.translate.setDefaultLang('en'); 
   }

  ngOnInit() {
    
  }

  changeLanguage(event: any) {
    this.selectedLanguage = event.detail.value; 
    console.log('Language changed to:', this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }
  next(){
    this.routing.navigate(['tabs/tab2']);
  }
}
