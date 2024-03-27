
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subscription-buy-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './subscription-buy-card.component.html',
  styleUrl: './subscription-buy-card.component.css'
})
export class SubscriptionBuyCardComponent {
 
    @Input() trainer: any; // Input property to receive movie information
    @Output() movieClicked: EventEmitter<any> = new EventEmitter<any>(); // Event emitter for movie click event
  
    
  
}
