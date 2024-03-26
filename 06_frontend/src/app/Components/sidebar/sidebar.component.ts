import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Always needed
import { RouterModule } from '@angular/router'; // Optional for routing
import { Input } from '@angular/core';

interface NavItem {
  icon: string;
  text: string;
  link: string; // Optional for actual links (replace with #0 for placeholders)
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() navItems: NavItem[] = [
  ];
}
