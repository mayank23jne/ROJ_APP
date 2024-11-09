import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterProfilePageRoutingModule } from './register-profile-routing.module';

import { RegisterProfilePage } from './register-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterProfilePageRoutingModule
  ],
  declarations: [RegisterProfilePage]
})
export class RegisterProfilePageModule {}
