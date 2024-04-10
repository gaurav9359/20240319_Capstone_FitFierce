import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../Services/authService/auth-service.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

interface Subscription {
  userName: string;
  email: string;
  phoneNumber: string;
  startDate: Date;
  endDate: Date;
}

interface NavItem {
  icon: string;
  text: string;
  link: string; // Optional for actual links (replace with #0 for placeholders)
}

@Component({
  selector: 'app-subscribed-user',
  standalone: true,
  imports: [MatTableModule, MatBadgeModule, MatButtonModule, MatIconModule, CommonModule,NavbarComponent,SidebarComponent],
  templateUrl: './subscribed-user.component.html',
  styleUrl: './subscribed-user.component.css'
})
export class SubscribedUserComponent {
  navItems: NavItem[] = [
    { icon: 'fa-solid fa-plus', text: 'Create Goals', link: '/trainer' },
    { icon: 'fa-solid fa-cart-shopping', text: 'Subscribed Users', link: '/subscribers' },
    { icon: 'fa-solid fa-user', text: 'My Profile', link: '/trainerprofile' },
    { icon: 'fa-solid fa-clock-rotate-left', text: 'History', link: '/historytrainer' }
  ];

  subscriptionDisplayedColumns: string[] = ['userName', 'email', 'phoneNumber', 'startDate', 'endDate'];
  subscriptionDataSource: MatTableDataSource<Subscription> = new MatTableDataSource<Subscription>([]);

  constructor(private http: HttpClient, public auth: AuthServiceService) { }

  getRole(): string {
    // console.log("oreno", this.auth.getRole())
    // if(this.auth.getRole()==='user'){
    //   return 'user'
    // }
    return 'user';
  }

  ngOnInit(): void {
    this.fetchSubscriptionHistory();
  }

  fetchSubscriptionHistory(): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.get<any>('http://localhost:3000/subscription/getUsers', { headers }).subscribe(
      (response) => {
        if (response) {
          console.log(response);
          const subscriptions = response.map((subscription: any) => ({
            userName: subscription.name,
            email: subscription.email,
            phoneNumber: subscription.phone_number,
            startDate: subscription.start_date,
            endDate: subscription.end_date
          }));
          this.subscriptionDataSource.data = subscriptions;
          console.log("oreno", this.subscriptionDataSource.data);
        }
      },
      (error) => {
        console.error('Error fetching subscription history:', error);
      }
    );
  }
}
