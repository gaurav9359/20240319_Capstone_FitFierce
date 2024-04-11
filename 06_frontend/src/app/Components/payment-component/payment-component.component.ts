import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/authService/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var Razorpay: any;

@Component({
  selector: 'app-payment-component',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './payment-component.component.html',
  styleUrl: './payment-component.component.css'
})
export class PaymentComponentComponent {
 
  constructor(private http: HttpClient, private route: ActivatedRoute,private auth:AuthServiceService,private router: Router) {}
  @Input() trainer_details:any

  

  Purchase() {
    let payment=this.trainer_details.price
    const options = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: payment * 100,
      name: 'FitFierce',
      key: 'rzp_test_OaFc3NxBZxWSHF',
      image: 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
      prefill: {
        name: 'Gaurav Pathak',
        email: 'gauravpathak2@gmail.com',
        contact: '8459247750',
      },
      theme: {
        color: '#21695c',
      },
      modal: {
        ondismiss: () => {
          console.log('Payment dismissed',this.trainer_details.id);
        },
      },
      handler: (response: any) => {
        // Navigate to another page upon successful payment
        console.log('success for ', this.trainer_details.id);
        this.handlePaymentSuccess(this.trainer_details.id);
      },
    };
    const successCallback = (paymentId: any) => {
      console.log('Payment successful with ID:', paymentId);
      
    };
    
    const failureCallback = (error: any) => {
      console.error('Payment failed with error:', error);
    };
    
    Razorpay.open(options);
}

handlePaymentSuccess(trainerId: string) {
  const authToken = this.auth.getToken();
  this.http.post(`http://localhost:3000/subscription/purchase?trainerId=${trainerId}`, null, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
  .subscribe(
    (response) => {
      console.log('Subscription purchased successfully:', response);
      // Navigate to another page or perform additional actions
      this.router.navigate(['/success']);
    },
    (error) => {
      console.error('Error purchasing subscription:', error);
    }
  );
}

}
