import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product-request',
  templateUrl: './new-product-request.component.html',
  styleUrls: ['./new-product-request.component.scss'],
})
export class NewProductRequestComponent  implements OnInit {
  @Output() requestAdded = new EventEmitter<any>();

  productName: string = '';
  productCount: number = 0;
  showCategoryFrom: boolean = false;
  title: string = 'Adding a new product request';
  isModalOpen: boolean = false;

  constructor(
    private router:Router
  ) { }

  ngOnInit() { }
  updateCount(operator:string) {
      if (operator === 'increment') {
        this.productCount++;
      } else if (operator === 'decrement') {
        this.productCount--; 
      }
      if (this.productCount < 0) {
        this.productCount = 0;
      }
  }
 
  addRequest() {
    const requestData = { name: this.productName };
    this.requestAdded.emit(requestData);
    this.isModalOpen = true;
    this.productName = '';
    
  }
  dismissModal() {
    this.isModalOpen = false; // Close the modal
    this.router.navigateByUrl('/tabs/tab1');
  }
  openCategoryFrom() {
    this.showCategoryFrom = true; 
    this.title = 'Requesting ROJ to add a new product';
  }

}
