import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/authService/auth-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  token!:string|null
  constructor(private authService: AuthServiceService,private router: Router){}

  ngOnInit(): void {
    this.token=this.authService.getToken()
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/']);
  }
}
