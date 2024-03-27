import { Component } from '@angular/core';
import { NavbarComponent } from '../../../Components/navbar/navbar.component';
import { SidebarComponent } from '../../../Components/sidebar/sidebar.component';
import { SubscriptionBuyCardComponent } from '../../../Components/subscription-buy-card/subscription-buy-card.component';
import { CommonModule, NgFor } from '@angular/common'; // Both CommonModule and NgFor are imported
import { FormsModule } from '@angular/forms';

interface NavItem {
  icon: string;
  text: string;
  link: string; // Optional for actual links (replace with #0 for placeholders)
}

@Component({
  selector: 'app-buy-page',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,SubscriptionBuyCardComponent,FormsModule,NgFor,CommonModule],
  templateUrl: './buy-page.component.html',
  styleUrl: './buy-page.component.css'
})
export class BuyPageComponent {
  navItems: NavItem[] = [
    { icon: 'fa-solid fa-chart-line', text: 'Home', link: '/' },
    { icon: 'fa-solid fa-bullseye', text: 'Manage Goals', link: '/manage-goals' },
    { icon: 'fa-solid fa-plus', text: 'Create Goals', link: '/create-goals' },
    { icon: 'fa-solid fa-cart-shopping', text: 'Buy Subscription', link: '/buy' },
    { icon: 'fa-solid fa-user', text: 'My Profile', link: '/profile' },
    { icon: 'fa-solid fa-clock-rotate-left', text: 'History', link: '/history' },
    { icon: 'fa-solid fa-right-from-bracket', text: 'Logout', link: '/logout' }
  ];

  trainers = [
    {
      name: 'Jon Jones',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tKYDproiVjI-3KrLHt7grKhRRExL5HS0HQm3HaBlyOZUYrO0q_CmmvauknYZxiRXFvU&usqp=CAU',
      speciality: ['MMA'],
      description:
        "A dad forms a bitter rivalry with his daughter's young rich boyfriend.",
      year: 2016,
      rating: 6.2,
    },
    {
      name: 'Jon Jones',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tKYDproiVjI-3KrLHt7grKhRRExL5HS0HQm3HaBlyOZUYrO0q_CmmvauknYZxiRXFvU&usqp=CAU',
      speciality: ['MMA'],
      description:
        "A dad forms a bitter rivalry with his daughter's young rich boyfriend.",
      year: 2016,
      rating: 6.2,
    },
    {
      name: 'Jon Jones',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tKYDproiVjI-3KrLHt7grKhRRExL5HS0HQm3HaBlyOZUYrO0q_CmmvauknYZxiRXFvU&usqp=CAU',
      speciality: ['MMA'],
      description:
        "A dad forms a bitter rivalry with his daughter's young rich boyfriend.",
      year: 2016,
      rating: 6.2,
    },
    {
      name: "Cristiano ronaldo",
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/800px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg',
        speciality: ['Football'],
      description:
        "A group of eccentric assassins are fed up with Gunther, the world's greatest hitman, and decide to kill him.",
      year: 2017,
      rating: 4.7,
    },
    {
      name: "Cristiano ronaldo",
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/800px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg',
        speciality: ['Football'],
      description:
        "A group of eccentric assassins are fed up with Gunther, the world's greatest hitman, and decide to kill him.",
      year: 2017,
      rating: 4.7,
    },
    {
      name: "Cristiano ronaldo",
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/800px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg',
        speciality: ['Football'],
      description:
        "A group of eccentric assassins are fed up with Gunther, the world's greatest hitman, and decide to kill him.",
      year: 2017,
      rating: 4.7,
    },
    {
      name: "Cristiano ronaldo",
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/800px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg',
        speciality: ['Football'],
      description:
        "A group of eccentric assassins are fed up with Gunther, the world's greatest hitman, and decide to kill him.",
      year: 2017,
      rating: 4.7,
    },
  ]
}
