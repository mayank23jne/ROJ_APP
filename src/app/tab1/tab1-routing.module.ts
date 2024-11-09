import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../component/home/home.component';
import { NewProductRequestComponent } from '../component/organization/new-product-request/new-product-request.component';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    children: [
      {
        path: '',
        component: HomeComponent,  // Child component to be loaded inside the router-outlet
      },
      {
        path: 'product-request',
        component: NewProductRequestComponent,  // Child component to be loaded inside the router-outlet
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
