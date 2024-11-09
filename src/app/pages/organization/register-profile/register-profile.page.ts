import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-register-profile',
  templateUrl: './register-profile.page.html',
  styleUrls: ['./register-profile.page.scss'],
})
export class RegisterProfilePage implements OnInit {
  currentStep = 1;
  isModalOpen: boolean = false;
  value: number = 100;
  touchStartX: number = 0;
  touchEndX: number = 0;
  images: (string | null)[] = new Array(5).fill(null);
  description: string = '';
  constructor(
    private theme: ThemeService,
    private menu:MenuController
  ) { }

  ngOnInit() {
    this.theme.setUserType('organization');
    this.menu.enable(false);
  }
   addImageBox() {
    // Add a new null value to the images array
    this.images.push(null);
  }
  async selectImage(index: number) {
    try {
      const result = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos 
      });

      this.images[index] = `data:image/${result.format};base64,${result.base64String}`;
      await this.saveImage(result.base64String, `image_${index}.${result.format}`);
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  }

  private async saveImage(base64Data: any, fileName: string): Promise<void> {
    try {
      await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data // Updated from FilesystemDirectory.Data to Directory.Data
      });
      console.log(`Image saved as ${fileName}`);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  }


  finish() {
   
    // Add your form submission logic here
  }

  useCurrentLocation() {
    console.log('Using current location');
    // Implement geolocation logic here
  }
  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
      this.isModalOpen = true;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
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
