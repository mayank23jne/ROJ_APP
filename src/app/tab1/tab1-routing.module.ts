import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../component/home/home.component';
import { NewProductRequestComponent } from '../component/organization/new-product-request/new-product-request.component';
import { Tab1Page } from './tab1.page';
import { OrganizationListComponent } from '../component/donor/organization-list/organization-list.component';
import { FilterOrgListComponent } from '../component/donor/filter-org-list/filter-org-list.component';
import { OrganizationDetailComponent } from '../component/donor/organization-detail/organization-detail.component';
import { DonationCheckoutComponent } from '../component/donor/donation-checkout/donation-checkout.component';
import { CheckoutFinalComponent } from '../component/donor/checkout-final/checkout-final.component';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    children: [
      {
        path: '',
        component: HomeComponent, 
      },
      {
        path: 'product-request',
        component: NewProductRequestComponent,  
      },
      { 
        path: 'donor-organizations-list', 
        component: OrganizationListComponent 
      },
      { 
        path: 'filter-org-list', 
        component: FilterOrgListComponent 
      },
      { 
        path: 'donor-organizations-detail', 
        component: OrganizationDetailComponent 
      },
      { 
        path: 'donation-checkout', 
        component: DonationCheckoutComponent 
      },
      { 
        path: 'checkout-final', 
        component: CheckoutFinalComponent 
      },
         
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
