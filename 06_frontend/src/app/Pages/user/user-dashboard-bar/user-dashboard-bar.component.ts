import { Component } from '@angular/core';
import { NavbarComponent } from '../../../Components/navbar/navbar.component';
import { AuthServiceService } from '../../../Services/authService/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { MyProfileComponent } from '../../../Components/my-profile/my-profile.component';
import { SidebarComponent } from '../../../Components/sidebar/sidebar.component';
import { Chart } from 'chart.js/auto';
import { Router } from '@angular/router';
interface NavItem {
  icon: string;
  text: string;
  link: string; // Optional for actual links (replace with #0 for placeholders)
}
@Component({
  selector: 'app-user-dashboard-bar',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,MyProfileComponent],
  templateUrl: './user-dashboard-bar.component.html',
  styleUrl: './user-dashboard-bar.component.css'
})
export class UserDashboardBarComponent {
  navItems: NavItem[] = [
    { icon: 'fa-solid fa-chart-line', text: 'Home', link: '/home' },
    { icon: 'fa-solid fa-bullseye', text: 'Manage Goals', link: '/managegoal' },
    { icon: 'fa-solid fa-plus', text: 'Create Goals', link: '/creategoals' },
    { icon: 'fa-solid fa-cart-shopping', text: 'Buy Subscription', link: '/buy' },
    { icon: 'fa-solid fa-user', text: 'My Profile', link: '/profile' },
    { icon: 'fa-solid fa-clock-rotate-left', text: 'History', link: '/history' },
    
  ];

  labelsExercise = ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00']

  dataExercise = [
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
  ]

  labelsDiet = ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00']

  dataDiet = [
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
    ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00']
  ]

  currMonth(){
    let today = new Date();
     return today.toLocaleString("default", { month: "long" });
  }

  prevMonth(){
    const today = new Date();

    // Get the previous month index, handling year boundary if necessary
    let previousMonth = today.getMonth() - 1;
    if (previousMonth < 0) {
      previousMonth = 11;
      today.setFullYear(today.getFullYear() - 1);
    }
    
    // Get the previous month name using a separate Date object
    const previousMonthDate = new Date(today.getFullYear(), previousMonth, 1); // Set date to 1st of previous month
    const previousMonthName = previousMonthDate.toLocaleString("default", { month: "long" });
    
  return previousMonthName
  }


  constructor(private http: HttpClient,private auth: AuthServiceService,private router:Router) { }

  ngOnInit(): void {
    this.fetchExerciseData()
    this.fetchDietData()
  }

  fetchExerciseData(){
    const token = this.auth.getToken();

    if (token) {
      this.http.get<any>('http://localhost:3000/dashboard/exercise', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).subscribe((response) => {
        this.labelsExercise = response.totalNumberOfDays;
        this.dataExercise = [
          response.currentMonthCompletionData,
          response.prevMonthCompletionData
        ];
        console.log(response)
        this.createChartExercise();
      }, (error) => {
        console.error('Error fetching exercise data:', error);
      });
    } else {
      this.createChartExercise()
      console.error('No token found. Unable to fetch exercise data.');
    }
  }

  fetchDietData(){
    const token = this.auth.getToken();

    if (token) {
      this.http.get<any>('http://localhost:3000/dashboard/diet', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).subscribe((response) => {
        this.labelsDiet = response.totalNumberOfDays;
        this.dataDiet = [
          response.currentMonthCompletionData,
          response.prevMonthCompletionData
        ];
        console.log(response)
        this.createChartDiet();
      }, (error) => {
        console.error('Error fetching exercise data:', error);
      });
    } else {
      this.createChartDiet()
      console.error('No token found. Unable to fetch exercise data.');
    }
  }

  public chart: any;
  public chart2: any;

  createChartExercise() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.labelsExercise,
        datasets: [
          {
            label: this.prevMonth(),
            data: this.dataExercise[1],
            backgroundColor: 'limegreen'
          },
          {
            label: this.currMonth(),
            data: this.dataExercise[0],
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Day ➡️'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Percentage ➡️'
            }
          }
        }
      }

    });
  }
  createChartDiet() {

    this.chart2= new Chart("MyChart2", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.labelsDiet,
        datasets: [
          {
            label: this.prevMonth(),
            data: this.dataDiet[1],
            backgroundColor: 'limegreen'
          },
          {
            label: this.currMonth(),
            data: this.dataDiet[0],
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Day ➡️'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Percentage ➡️'
            }
          }
        }
      }

    });
  }

  handleBarClick(){

  }
  handleLineClick(){
    this.router.navigateByUrl('/home')
  }

}
