import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/authService/auth-service.service';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  trainerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) {
    this.trainerForm = this.fb.group({
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      price: ['', Validators.required],
      validity_days: ['', Validators.required],
      trainer_speciality: ['', Validators.required],
      role:'trainer',
      image: ['', Validators.required],
      banner: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.trainerForm.valid) {
      const trainerData = this.trainerForm.value;
      console.log(trainerData)
      this.authService.signupTrainer(trainerData).subscribe(
        (response) => {
          console.log('Trainer signup successful:', response);
          this.trainerForm.reset();
          this.router.navigateByUrl('/signin')

        },
        (error) => {
          console.error('Trainer signup failed:', error);
          // Handle error, display error message, etc.
        }
      );
    }
  }
}
