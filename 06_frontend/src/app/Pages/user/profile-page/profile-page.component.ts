import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../Components/navbar/navbar.component';
import { SidebarComponent } from '../../../Components/sidebar/sidebar.component';
import { MyProfileComponent } from '../../../Components/my-profile/my-profile.component';
import { SubsTrainerDetailsComponent } from '../../../Components/subs-trainer-details/subs-trainer-details.component';
import { ProfileServiceService } from '../../../Services/profileService/profile-service.service';
import { CommonModule } from '@angular/common';

interface NavItem {
  icon: string;
  text: string;
  link: string; // Optional for actual links (replace with #0 for placeholders)
}

interface UserProfile {
  name: string;
  email: string;
  phone_number: string;
  role: string;
}
export interface trainerDetails {
  position: number;
  name: string;
  speciality: string; // Corrected from "symbol"
  validity_Days: number; // Corrected from "symbol" with snake_case
  price: number;
}

interface UserProfilee {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  subscribed_plans: {
    trainer_name: string;
    image: string;
    speciality: string;
    price: number;
    validity_days: number;
  }[];
}


@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [MyProfileComponent,NavbarComponent,SidebarComponent,SubsTrainerDetailsComponent,CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  navItems: NavItem[] = [
    { icon: 'fa-solid fa-chart-line', text: 'Home', link: '/home' },
    { icon: 'fa-solid fa-bullseye', text: 'Manage Goals', link: '/managegoal' },
    { icon: 'fa-solid fa-plus', text: 'Create Goals', link: '/creategoals' },
    { icon: 'fa-solid fa-cart-shopping', text: 'Buy Subscription', link: '/buy' },
    { icon: 'fa-solid fa-user', text: 'My Profile', link: '/profile' },
    { icon: 'fa-solid fa-clock-rotate-left', text: 'History', link: '/history' },
    
  ];
  userProfile!: UserProfile;
  trainerDetails!:trainerDetails[]
  
  
  constructor(private ProfileService: ProfileServiceService){

  }
  userProfily!: UserProfilee;

  mapSubscribedPlansToTrainerDetails(subscribedPlans: { trainer_name: string; image: string; speciality: string; price: number; validity_days: number }[]): trainerDetails[] {
    return subscribedPlans.map((plan, index) => ({
      position: index + 1,
      name: plan.trainer_name,
      speciality: plan.speciality,
      validity_Days: plan.validity_days,
      price: plan.price,
    }));
   
  }

  ngOnInit(): void {
    this.ProfileService.getUserProfilee()
      .subscribe(
        userProfile => {
          this.userProfily = userProfile;
          this.userProfile = {
            name: this.userProfily?.name,
            email: this.userProfily?.email,
            phone_number: this.userProfily?.phone_number,
            role: this.userProfily?.role,
          };
          
          // Map subscribed_plans to trainerDetails
          this.trainerDetails = this.mapSubscribedPlansToTrainerDetails(this.userProfily.subscribed_plans);
          console.log(this.trainerDetails);
        },
        error => console.error(error)
      );
  }

  

  


}
