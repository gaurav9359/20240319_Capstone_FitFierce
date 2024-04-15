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
  selector: 'app-history-trainer',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,HistoryComponentComponent],
  templateUrl: './history-trainer.component.html',
  styleUrl: './history-trainer.component.css'
})
export class HistoryTrainerComponent {
  navItems: NavItem[] = [
    { icon: 'fa-solid fa-plus', text: 'Create Goals', link: '/trainer' },
    { icon: 'fa-solid fa-cart-shopping', text: 'Subscribed Users', link: '/subscribers' },
    { icon: 'fa-solid fa-user', text: 'My Profile', link: '/trainerprofile' },
    { icon: 'fa-solid fa-clock-rotate-left', text: 'History', link: '/historytrainer' }
  ];

  exerciseHistory:boolean=true

  handleExerciseClick(){
    this.exerciseHistory=true;
  }

  handleDietClick(){
    this.exerciseHistory=false
  }
}
