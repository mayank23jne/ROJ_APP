import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.page.html',
  styleUrls: ['./contact-info.page.scss'],
})
export class ContactInfoPage implements OnInit {

  contactForm!: FormGroup;
  topics = ['General Inquiry', 'Feedback', 'Support'];
  subTopics = ['Technical Issue', 'Billing', 'Other'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      topic: ['', Validators.required],
      subTopic: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.loadReCAPTCHA();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
    }
  }

  loadReCAPTCHA() {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    document.body.appendChild(script);
  }

}
