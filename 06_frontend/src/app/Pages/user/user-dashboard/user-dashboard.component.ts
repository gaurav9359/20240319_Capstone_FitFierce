import { Component } from '@angular/core';
import { NavbarComponent } from '../../../Components/navbar/navbar.component';
import { MyProfileComponent } from '../../../Components/my-profile/my-profile.component';
import { SidebarComponent } from '../../../Components/sidebar/sidebar.component';

interface NavItem {
  icon: string;
  text: string;
  link: string; // Optional for actual links (replace with #0 for placeholders)
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,MyProfileComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  navItems: NavItem[] = [
    { icon: 'fa-solid fa-chart-line', text: 'Home', link: '/' },
    { icon: 'fa-solid fa-bullseye', text: 'Manage Goals', link: '/manage-goals' },
    { icon: 'fa-solid fa-plus', text: 'Create Goals', link: '/create-goals' },
    { icon: 'fa-solid fa-cart-shopping', text: 'Buy Subscription', link: '/buy-subscription' },
    { icon: 'fa-solid fa-user', text: 'My Profile', link: '/profile' },
    { icon: 'fa-solid fa-clock-rotate-left', text: 'History', link: '/history' },
    { icon: 'fa-solid fa-right-from-bracket', text: 'Logout', link: '/logout' }
  ];
}
