import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/authService/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  trainerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {
    

    this.trainerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      phone_number: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
      price: ['', Validators.required],
      validity_days: ['', Validators.required],
      trainer_speciality: ['', Validators.required],
      role: 'trainer',
      image: ['', [Validators.required, Validators.maxLength(200)]],
      banner: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  onSubmit(): void {
    if (this.trainerForm.valid) {
      const trainerData = this.trainerForm.value;
      console.log(trainerData);
      this.authService.signupTrainer(trainerData).subscribe(
        (response) => {
          console.log('Trainer signup successful:', response);
          this.trainerForm.reset();
          this.router.navigateByUrl('/signin');
        },
        (error) => {
          console.error('Trainer signup failed:', error);
          // Handle error, display error message, etc.
        }
      );
    }
  }
}