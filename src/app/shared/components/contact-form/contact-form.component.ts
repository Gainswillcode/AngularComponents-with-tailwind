import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import emailjs from 'emailjs-com';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, TranslatePipe],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {

  constructor( private fb: FormBuilder){ }


  contactForm!: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

 ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.maxLength(150)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

 sendEmail(): void {
    if (this.contactForm.invalid) return;

    this.loading = true;
    const { name, email, subject, message } = this.contactForm.value;

   const templateParams = {
  from_name: this.contactForm.value.name,
  from_email: this.contactForm.value.email,
  subject: this.contactForm.value.subject,
  message: this.contactForm.value.message
};

    emailjs
  .send('service_ckts6wn', 'template_c4yotmo', templateParams, 'mS-OAqLw4l53FdLF9')
  .then(() => {
    this.successMessage = 'Votre message a été envoyé avec succès.';
    this.contactForm.reset();

    setTimeout(() => {
      this.successMessage = '';
    }, 2000);
  })
  .catch(() => {
    this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
    setTimeout(() => {
      this.errorMessage = '';
    }, 1000);
  })
  .finally(() => {
    this.loading = false;
  });


  }

}
