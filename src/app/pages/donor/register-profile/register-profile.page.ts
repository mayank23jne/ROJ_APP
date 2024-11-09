import { Component, OnInit  } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-register-profile',
  templateUrl: './register-profile.page.html',
  styleUrls: ['./register-profile.page.scss'],
})
export class RegisterProfilePage implements OnInit {
 
  currentStep = 1;
  date = '2000-07-17';
  donorForm = {
    name: 'Avishuman Jha',
    email: 'avishumanjha2003@gmail.com',
    phone: '+91 8957769980',
    dob: '2000-07-17',
    state: 'Madhya Pradesh',
    district: '',
    city: 'Bhopal',
    pincode: '462021'
  };
  touchStartX: number = 0;
  touchEndX: number = 0;

  constructor(
    private theme: ThemeService,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.theme.setUserType('donor')
    this.menu.enable(false, 'start');
  }
  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  finish() {
    console.log('Form submitted:', this.donorForm);
  }

  useCurrentLocation() {
    console.log('Using current location');
  }

  onTouchStart(event: TouchEvent) {
  this.touchStartX = event.touches[0].clientX;
  this.touchEndX = this.touchStartX; // Initialize touchEndX to handle quick taps
}

onTouchMove(event: TouchEvent) {
  this.touchEndX = event.touches[0].clientX;
}

onTouchEnd() {
  const dragDistance = this.touchEndX - this.touchStartX;

  // Ignore if the drag distance is less than 10px (considered a tap)
  if (Math.abs(dragDistance) < 10) {
    return; // No action for small movements (taps)
  }

  if (dragDistance < -100) {
    this.nextStep();  // Move to the next tab on left swipe
  } else if (dragDistance > 100) {
    this.prevStep();  // Move to the previous tab on right swipe
  }
}

}