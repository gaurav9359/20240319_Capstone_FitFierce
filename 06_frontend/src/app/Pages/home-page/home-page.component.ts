import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/authService/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { faUser, faShieldHalved, faHeadset } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  
  faUser = faUser;
  faShieldHalved = faShieldHalved;
  faHeadset = faHeadset;
  token!:string|null
  constructor(private authService: AuthServiceService,private router: Router){}

  ngOnInit(): void {
    this.token=this.authService.getToken()
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/signin']);
  }
  getRole(){
    return this.authService.getRole()
  }
}
