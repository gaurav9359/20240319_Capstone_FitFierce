import { Component } from '@angular/core';
import { NavbarComponent } from '../../../Components/navbar/navbar.component';
import { SidebarComponent } from '../../../Components/sidebar/sidebar.component';
import { CreateExerciseComponent } from '../../../Components/create-exercise/create-exercise.component';
import { CreateDietComponent } from '../../../Components/create-diet/create-diet.component';
import { ManageExerciseComponent } from '../../../Components/manage-exercise/manage-exercise.component';
import { MatIcon } from '@angular/material/icon';
interface NavItem {
  icon: string;
  text: string;
  link: string; // Optional for actual links (replace with #0 for placeholders)
}

@Component({
  selector: 'app-create-goals',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,CreateExerciseComponent,CreateDietComponent,MatIcon],
  templateUrl: './create-goals.component.html',
  styleUrl: './create-goals.component.css'
})
export class CreateGoalsComponent {
  navItems: NavItem[] = [
    { icon: 'fa-solid fa-chart-line', text: 'Home', link: '/home' },
    { icon: 'fa-solid fa-bullseye', text: 'Manage Goals', link: '/managegoal' },
    { icon: 'fa-solid fa-plus', text: 'Create Goals', link: '/creategoals' },
    { icon: 'fa-solid fa-cart-shopping', text: 'Buy Subscription', link: '/buy' },
    { icon: 'fa-solid fa-user', text: 'My Profile', link: '/profile' },
    { icon: 'fa-solid fa-clock-rotate-left', text: 'History', link: '/history' }
  ];
}
