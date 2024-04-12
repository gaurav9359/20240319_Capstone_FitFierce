import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { AuthServiceService } from '../../Services/authService/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NavbarComponent,
  ],
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent {
  userForm = new FormGroup({
    // Add new form controls
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/) // Ensures 10 digits for phone number
    ]),
    // Existing form controls (unchanged)
    causeName: new FormControl('', Validators.required),
    fundsRequired: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+(\.\d{1,2})?$/) // Ensures valid decimal format
    ]),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required)
  });
  

  categories = ['Health', 'Education', 'Environment', 'Social', 'Other'];

  constructor(private authService: AuthServiceService,private router: Router) {}

  onSubmit() {
    const parameter = this.userForm.value;
    const userData = {
      name: parameter.name,
      email: parameter.email,
      password: parameter.password,
      phone_number: parameter.phoneNumber
    };

    this.authService.signup(userData)
      .subscribe(
        (response) => {
          console.log('User signed up successfully:', response);
          this.router.navigateByUrl('/signin')
          // Handle the successful response
        },
        (error) => {
          console.error('Error signing up:', error);
          // Handle the error
        }
      );
  }
}