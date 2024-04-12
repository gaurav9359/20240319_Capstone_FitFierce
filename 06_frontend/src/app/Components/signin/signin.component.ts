import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MyErrorStateMatcher } from '../../classes'; 
import { AuthServiceService } from '../../Services/authService/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(7),
    Validators.maxLength(20),
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthServiceService,private router: Router){}


  resetController() {
    const value = this.emailFormControl.value;
    this.emailFormControl.reset();
    this.emailFormControl.setValue(value);

    const value2 = this.passwordFormControl.value;
    this.passwordFormControl.reset();
    this.passwordFormControl.setValue(value2);
  }

  onSubmit(){
    const credentials = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value
    };

    this.authService.signin(credentials)
      .subscribe(
        (response) => {
          console.log('User signed in successfully:', response);
          // Store the token in localStorage
          if(response.role==='user'){
            this.router.navigateByUrl('/home')
          }
          else{
            this.router.navigateByUrl('/trainer')
          }
          this.authService.setToken(response.token);
          console.log("response",response)
          this.authService.setRole(response.role);
        },
        (error) => {
          console.error('Error signing in:', error);
          // Handle the error
        }
      );
  }

 
  }

 

