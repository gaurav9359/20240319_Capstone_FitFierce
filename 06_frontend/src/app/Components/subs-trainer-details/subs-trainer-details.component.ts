import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ProfileServiceService } from '../../Services/profileService/profile-service.service';

interface UserProfilee {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  subscribed_plans: {
    trainer_name: string;
    image: string;
    speciality: string;
    price: number;
    validity_days: number;
  }[];
}

export interface trainerDetails {
  position: number;
  name: string;
  speciality: string;
  validity_Days: number;
  price: number;
}

@Component({
  selector: 'app-subs-trainer-details',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './subs-trainer-details.component.html',
  styleUrls: ['./subs-trainer-details.component.css']
})
export class SubsTrainerDetailsComponent implements OnInit{

  displayedColumns: string[] = ['position', 'name', 'speciality', 'validity_Days', 'price'];
  dataSource: trainerDetails[] = [];

  constructor(private ProfileService: ProfileServiceService) {}

  mapSubscribedPlansToTrainerDetails(subscribedPlans: { trainer_name: string; image: string; speciality: string; price: number; validity_days: number }[]): trainerDetails[] {
    return subscribedPlans.map((plan, index) => ({
      position: index + 1,
      name: plan.trainer_name,
      speciality: plan.speciality,
      validity_Days: plan.validity_days,
      price: plan.price,
    }));
   
  }

  userProfily!: UserProfilee;
  

  ngOnInit(): void {
    this.ProfileService.getUserProfilee()
      .subscribe(
        userProfile => {
          this.userProfily = userProfile;
          
          // Map subscribed_plans to trainerDetails
          this.dataSource = this.mapSubscribedPlansToTrainerDetails(this.userProfily.subscribed_plans);
          console.log(this.dataSource);
        },
        error => console.error(error)
      );
  }
}