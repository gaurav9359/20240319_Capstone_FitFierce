import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Always needed
import { Router, RouterModule } from '@angular/router'; // Optional for routing
interface UserProfile {
  name: string;
  email: string;
  phone_number: string;
  role: string;
  

}
@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
 @Input() userProfile:UserProfile={
  name:"",
  email:"",
  phone_number:"",
  role:"",
 };

 
}
