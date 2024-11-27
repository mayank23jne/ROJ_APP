import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactInfoPageRoutingModule } from './contact-info-routing.module';

import { ContactInfoPage } from './contact-info.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    ContactInfoPageRoutingModule
  ],
  declarations: [ContactInfoPage]
})
export class ContactInfoPageModule {}
