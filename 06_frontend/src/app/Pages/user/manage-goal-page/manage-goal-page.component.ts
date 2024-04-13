import { Component } from '@angular/core';
import { ManageDietComponent } from '../../../Components/manage-diet/manage-diet.component';
import { ManageExerciseComponent } from '../../../Components/manage-exercise/manage-exercise.component';
import { NavbarComponent } from '../../../Components/navbar/navbar.component';
import { SidebarComponent } from '../../../Components/sidebar/sidebar.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';

interface NavItem {
  icon: string;
  text: string;
  link: string; // Optional for actual links (replace with #0 for placeholders)
}

@Component({
  selector: 'app-manage-goal-page',
  standalone: true,
  imports: [ManageDietComponent,ManageExerciseComponent,NavbarComponent,SidebarComponent,MatTabsModule,MatProgressBarModule],
  templateUrl: './manage-goal-page.component.html',
  styleUrl: './manage-goal-page.component.css'
})
export class ManageGoalPageComponent {
  navItems: NavItem[] = [
    { icon: 'fa-solid fa-chart-line', text: 'Home', link: '/home' },
    { icon: 'fa-solid fa-bullseye', text: 'Manage Goals', link: '/managegoal' },
    { icon: 'fa-solid fa-plus', text: 'Create Goals', link: '/creategoals' },
    { icon: 'fa-solid fa-cart-shopping', text: 'Buy Subscription', link: '/buy' },
    { icon: 'fa-solid fa-user', text: 'My Profile', link: '/profile' },
    { icon: 'fa-solid fa-clock-rotate-left', text: 'History', link: '/history' }
  ];

  status:string="pending";


  getStatus():string{
    return status
  }

  onTabChange(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        this.status = 'pending';
        break;
      case 1:
        this.status = 'completed';
        break;
      case 2:
        this.status = 'all';
        break;
    }
  }

  

  
}
