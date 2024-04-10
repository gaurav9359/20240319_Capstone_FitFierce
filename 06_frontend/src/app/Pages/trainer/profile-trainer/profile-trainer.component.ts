import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Always needed
import { Router, RouterModule } from '@angular/router'; // Optional for routing
import { NavbarComponent } from '../../../Components/navbar/navbar.component';
import { SidebarComponent } from '../../../Components/sidebar/sidebar.component';
import { ProfileServiceService } from '../../../Services/profileService/profile-service.service';
interface NavItem {
  icon: string;
  text: string;
  link: string; // Optional for actual links (replace with #0 for placeholders)
}


@Component({
  selector: 'app-profile-trainer',
  standalone: true,
  imports: [CommonModule,RouterModule,NavbarComponent,SidebarComponent],
  templateUrl: './profile-trainer.component.html',
  styleUrl: './profile-trainer.component.css'
})

export class ProfileTrainerComponent {
  navItems: NavItem[] = [
    { icon: 'fa-solid fa-plus', text: 'Create Goals', link: '/trainer' },
    { icon: 'fa-solid fa-cart-shopping', text: 'Subscribed Users', link: '/subscribers' },
    { icon: 'fa-solid fa-user', text: 'My Profile', link: '/trainerprofile' },
    { icon: 'fa-solid fa-clock-rotate-left', text: 'History', link: '/historytrainer' }
  ];
  userProfile!: any;
  
  
  constructor(private ProfileService: ProfileServiceService){

  }
  userProfily!: any;



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
            image:this.userProfily?.image,
            banner:this.userProfily?.banner,
            description:this.userProfily?.description,
            trainer_speciality:this.userProfily?.trainer_speciality,
            price:this.userProfily?.price,
            validity_days:this.userProfily?.validity_days,

          };
          
          // Map subscribed_plans to trainerDetails
         
          console.log(this.userProfily);
        },
        error => console.error(error)
      );
  }

  

  
}
