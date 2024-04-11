import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../Components/navbar/navbar.component';
import { SidebarComponent } from '../../../Components/sidebar/sidebar.component';
import { SubscriptionBuyCardComponent } from '../../../Components/subscription-buy-card/subscription-buy-card.component';
import { CommonModule, NgFor } from '@angular/common'; // Both CommonModule and NgFor are imported
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { PaymentComponentComponent } from '../../../Components/payment-component/payment-component.component';

interface NavItem {
  icon: string;
  text: string;
  link: string; // Optional for actual links (replace with #0 for placeholders)
}

interface trainerDetails{
  name:string,
  image: string,
  trainer_speciality:string,
  price: number,
  _id:string
}



@Component({
  selector: 'app-buy-page',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,SubscriptionBuyCardComponent,FormsModule,NgFor,CommonModule,PaymentComponentComponent],
  templateUrl: './buy-page.component.html',
  styleUrl: './buy-page.component.css'
})
export class BuyPageComponent implements OnInit{
  navItems: NavItem[] = [
    { icon: 'fa-solid fa-chart-line', text: 'Home', link: '/home' },
    { icon: 'fa-solid fa-bullseye', text: 'Manage Goals', link: '/managegoal' },
    { icon: 'fa-solid fa-plus', text: 'Create Goals', link: '/creategoals' },
    { icon: 'fa-solid fa-cart-shopping', text: 'Buy Subscription', link: '/buy' },
    { icon: 'fa-solid fa-user', text: 'My Profile', link: '/profile' },
    { icon: 'fa-solid fa-clock-rotate-left', text: 'History', link: '/history' },
  ];

  trainers!:any
  payment_details!:any

  constructor(private http: HttpClient) {}

  
  
  ngOnInit(): void {
    this.fetchTrainers();
    
    
  }

  fetchTrainers() {
    const token = localStorage.getItem("authToken");
    if(!token){
      this.trainers=null
    }
    else{
      let headers = new HttpHeaders();
     headers = headers.set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:3000/user/getalltrainer', { headers })
      .subscribe(
        (response) => {
          this.trainers = response
          this.payment_details=response
        },
        (error) => {
          console.error('Error fetching trainers:', error);
          // Handle the error
        }
      );
    }
  }
  
}
