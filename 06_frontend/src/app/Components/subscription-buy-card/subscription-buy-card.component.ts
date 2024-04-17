
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { PaymentComponentComponent } from '../payment-component/payment-component.component';
@Component({
  selector: 'app-subscription-buy-card',
  standalone: true,
  imports: [RouterLink,PaymentComponentComponent],
  templateUrl: './subscription-buy-card.component.html',
  styleUrl: './subscription-buy-card.component.css'
})
export class SubscriptionBuyCardComponent{
 
    @Input() trainer: any
     // Input property to receive movie information
     @Input() payment_details:any
    constructor(private router: Router) {
      
    }

  navigateToTrainerDetails() {
    this.router.navigate(['/trainerdetail'], { queryParams: { id: this.trainer._id } });
  }
  
    
  
}
