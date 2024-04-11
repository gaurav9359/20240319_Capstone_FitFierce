import { Component } from '@angular/core';
import { NavbarComponent } from '../../../Components/navbar/navbar.component';
import { SidebarComponent } from '../../../Components/sidebar/sidebar.component';
import { HistoryComponentComponent } from '../../../Components/history-component/history-component.component';

interface NavItem {
  icon: string;
  text: string;
  link: string; // Optional for actual links (replace with #0 for placeholders)
}

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,HistoryComponentComponent],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent {
  navItems: NavItem[] = [
    { icon: 'fa-solid fa-chart-line', text: 'Home', link: '/home' },
    { icon: 'fa-solid fa-bullseye', text: 'Manage Goals', link: '/managegoal' },
    { icon: 'fa-solid fa-plus', text: 'Create Goals', link: '/creategoals' },
    { icon: 'fa-solid fa-cart-shopping', text: 'Buy Subscription', link: '/buy' },
    { icon: 'fa-solid fa-user', text: 'My Profile', link: '/profile' },
    { icon: 'fa-solid fa-clock-rotate-left', text: 'History', link: '/history' },
    
  ];
}
