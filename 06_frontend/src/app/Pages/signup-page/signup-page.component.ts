import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { SignupComponent } from '../../Components/signup/signup.component';
@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [NavbarComponent,SignupComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {

}
