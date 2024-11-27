import { IonicModule } from '@ionic/angular';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SharedModule } from '../shared.module';
import { NewProductRequestComponent } from '../component/organization/new-product-request/new-product-request.component';
import { HomeComponent } from '../component/home/home.component';
import { OrganizationListComponent } from '../component/donor/organization-list/organization-list.component';
import { FilterOrgListComponent } from '../component/donor/filter-org-list/filter-org-list.component';
import { OrganizationDetailComponent } from '../component/donor/organization-detail/organization-detail.component';
import { DonationCheckoutComponent } from '../component/donor/donation-checkout/donation-checkout.component';
import { CheckoutFinalComponent } from '../component/donor/checkout-final/checkout-final.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    Tab1Page,
    NewProductRequestComponent,
    HomeComponent,
    OrganizationListComponent,
    OrganizationDetailComponent,
    DonationCheckoutComponent,
    CheckoutFinalComponent,
    FilterOrgListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1PageModule {}
