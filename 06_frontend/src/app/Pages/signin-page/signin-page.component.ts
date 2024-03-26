import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { SigninComponent } from '../../Components/signin/signin.component';

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [NavbarComponent,SigninComponent],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css'
})
export class SigninPageComponent {

}
