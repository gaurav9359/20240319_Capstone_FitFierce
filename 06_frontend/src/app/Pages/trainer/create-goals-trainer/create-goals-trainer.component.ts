import { Component } from '@angular/core';
import { NavbarComponent } from '../../../Components/navbar/navbar.component';
import { SidebarComponent } from '../../../Components/sidebar/sidebar.component';
import { CreateExerciseComponent } from '../../../Components/create-exercise/create-exercise.component';
import { CreateDietComponent } from '../../../Components/create-diet/create-diet.component';
import { ManageExerciseComponent } from '../../../Components/manage-exercise/manage-exercise.component';
interface NavItem {
  icon: string;
  text: string;
  link: string; // Optional for actual links (replace with #0 for placeholders)
}
@Component({
  selector: 'app-create-goals',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,CreateExerciseComponent,CreateDietComponent],
  templateUrl: './create-goals-trainer.component.html',
  styleUrl: './create-goals-trainer.component.css'
})
export class CreateGoalsTrainerComponent {
  navItems: NavItem[] = [
    { icon: 'fa-solid fa-plus', text: 'Create Goals', link: '/trainer' },
    { icon: 'fa-solid fa-cart-shopping', text: 'Subscribed Users', link: '/subscribers' },
    { icon: 'fa-solid fa-user', text: 'My Profile', link: '/profile' },
    { icon: 'fa-solid fa-clock-rotate-left', text: 'History', link: '/historytrainer' }
  ];
}
