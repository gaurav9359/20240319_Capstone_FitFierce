import { Component } from '@angular/core';
import { NavbarComponent } from '../../../Components/navbar/navbar.component';
import { SidebarComponent } from '../../../Components/sidebar/sidebar.component';
import { MyProfileComponent } from '../../../Components/my-profile/my-profile.component';
import { SubsTrainerDetailsComponent } from '../../../Components/subs-trainer-details/subs-trainer-details.component';

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


@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [MyProfileComponent,NavbarComponent,SidebarComponent,SubsTrainerDetailsComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  navItems: NavItem[] = [
    { icon: 'fa-solid fa-chart-line', text: 'Home', link: '/' },
    { icon: 'fa-solid fa-bullseye', text: 'Manage Goals', link: '/manage-goals' },
    { icon: 'fa-solid fa-plus', text: 'Create Goals', link: '/create-goals' },
    { icon: 'fa-solid fa-cart-shopping', text: 'Buy Subscription', link: '/buy' },
    { icon: 'fa-solid fa-user', text: 'My Profile', link: '/profile' },
    { icon: 'fa-solid fa-clock-rotate-left', text: 'History', link: '/history' },
    { icon: 'fa-solid fa-right-from-bracket', text: 'Logout', link: '/logout' }
  ];

  userProfile: UserProfile = {
    name: "orewa",
    email: "orewa@gmail.com",
    phone_number: "9359450632",
    role: "user"
  };


}
