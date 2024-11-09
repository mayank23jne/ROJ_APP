import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { SharedModule } from '../shared.module';
import { DonationsComponent as DonorDonationsComponent } from '../component/donor/donations/donations.component';
import { DonationsComponent as OrganizationDonationsComponent } from '../component/organization/donations/donations.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    SharedModule,
  ],
  declarations: [
    Tab3Page,
    DonorDonationsComponent,
    OrganizationDonationsComponent
  ]
})
export class Tab3PageModule {}
