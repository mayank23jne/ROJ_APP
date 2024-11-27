import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FilterOrgListComponent } from '../filter-org-list/filter-org-list.component';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent  implements OnInit {

  receivedData: any;
  searchText:string = "";
  dataFilter:any= [];
  dataOrg:any = {'id':1,'Description':'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsum'}
  constructor(private router: Router,
    private modalCtrl:ModalController
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.receivedData = navigation?.extras?.state?.['data'];
    this.searchText = this.receivedData?.search_text;
    console.log(this.receivedData); 
  }

  ngOnInit() {}

  async filter(filter_type:any){
    const modal = await this.modalCtrl.create({
      component: FilterOrgListComponent,
      initialBreakpoint: 0.3, 
      breakpoints: [0, 0.3, 1], 
      componentProps: {
        filterType:filter_type,
      },
      cssClass: 'custom-height-filter-modal' 
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      this.dataFilter = dataReturned;
      console.log(this.dataFilter);
    });
    return await modal.present();
  }
  
  donate(data:any){
    const dataToSend = { dataContainer: data }; 
    this.router.navigate(['/tabs/tab1/donor-organizations-detail'], { 
      state: { data: dataToSend } 
    });
  }

}
