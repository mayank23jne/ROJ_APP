import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonationsComponent as DonorDonationsComponent } from '../component/donor/donations/donations.component';
import { DonationsComponent as OrganizationDonationsComponent } from '../component/organization/donations/donations.component';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
    children: [
      {
        path: 'donor-donation',
        component:DonorDonationsComponent
      },
      {
        path: 'organization-donation',
        component: OrganizationDonationsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
