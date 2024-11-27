import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab4PageRoutingModule } from './tab4-routing.module';
import { HeaderComponent } from '../header/header.component';
import { SharedModule } from '../shared.module';
import { ProfileComponent as DonorProfileComponent } from '../component/donor/profile/profile.component';
import { ProfileComponent as OrganizationProfileComponent } from '../component/organization/profile/profile.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab4PageRoutingModule,
    SharedModule
  ],
  declarations: [
    Tab4Page,
    DonorProfileComponent,
    OrganizationProfileComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab4PageModule {}
