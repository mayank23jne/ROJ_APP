import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterProfilePage } from './register-profile.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterProfilePageRoutingModule {}
