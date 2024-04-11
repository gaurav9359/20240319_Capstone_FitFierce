import { Component } from '@angular/core';
import { NavbarComponent } from '../../../Components/navbar/navbar.component';
import { AuthServiceService } from '../../../Services/authService/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../../../Components/sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { PaymentComponentComponent } from '../../../Components/payment-component/payment-component.component';

interface NavItem {
  icon: string;
  text: string;
  link: string; // Optional for actual links (replace with #0 for placeholders)
}

@Component({
  selector: 'app-trainer-details',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,PaymentComponentComponent],
  templateUrl: './trainer-details.component.html',
  styleUrl: './trainer-details.component.css'
})
export class TrainerDetailsComponent {

  navItems: NavItem[] = [
    { icon: 'fa-solid fa-chart-line', text: 'Home', link: '/home' },
    { icon: 'fa-solid fa-bullseye', text: 'Manage Goals', link: '/managegoal' },
    { icon: 'fa-solid fa-plus', text: 'Create Goals', link: '/creategoals' },
    { icon: 'fa-solid fa-cart-shopping', text: 'Buy Subscription', link: '/buy' },
    { icon: 'fa-solid fa-user', text: 'My Profile', link: '/profile' },
    { icon: 'fa-solid fa-clock-rotate-left', text: 'History', link: '/history' },
    
  ];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthServiceService
  ) {}

  payment_details:any

  trainer_details: any;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const trainerId = params['id'];
      this.fetchTrainerDetails(trainerId);

      
    });
    console.log(this.trainer_details.price)
      
    }
    
    
    fetchTrainerDetails(trainerId: string) {
      const authToken = this.auth.getToken();
      
      this.http.get(`http://localhost:3000/user/gettrainerbyid?id=${trainerId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      .subscribe(
        (response) => {
          console.log(response)
          this.trainer_details = response;
          console.log(response);
          this.payment_details={id:this.trainer_details._id,price:this.trainer_details.price}
        },
        (error) => {
          console.error('Error fetching trainer details:', error);
        }
      );
    }
  
}
