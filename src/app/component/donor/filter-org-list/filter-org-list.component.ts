import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-filter-org-list',
  templateUrl: './filter-org-list.component.html',
  styleUrls: ['./filter-org-list.component.scss'],
})
export class FilterOrgListComponent  implements OnInit {
  
  filter_type:any;
  no_of_product:any;
  filterForm!: FormGroup;
  distance:boolean = false;

  constructor(private modalCtrl: ModalController,private navParams: NavParams,private fb: FormBuilder) { }

  ngOnInit() {
    this.filter_type = this.navParams.get('filterType');
    this.filterForm = this.fb.group({
      noOfProducts: [10], 
      organizationType: [''], 
      verificationStatus: ['verified']
    });
  }

  close(){
    this.modalCtrl.dismiss();
  }

  onRangeChange(event: any) {
    const newCount = event.detail.value;
    console.log('Range changed:', newCount);
  }

  updateSliderValue(event: any) {
    console.log('Slider Value:', event.detail.value);
  }

  submitForm() {
    console.log('Filter Data:', this.filterForm.value);
  }
 
}
