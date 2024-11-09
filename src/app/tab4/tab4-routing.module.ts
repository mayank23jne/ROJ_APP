import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab4Page } from './tab4.page';
import { ProfileComponent as DonorProfileComponent } from '../component/donor/profile/profile.component';
import { ProfileComponent as OrganizationProfileComponent } from '../component/organization/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page,
    children: [
      {
        path: 'donor-profile',
        component: DonorProfileComponent
      },
      {
        path: 'organization-profile',
        component: OrganizationProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab4PageRoutingModule {}
