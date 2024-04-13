import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Always needed
import { Router, RouterModule } from '@angular/router'; // Optional for routing
import {MatIconModule} from '@angular/material/icon';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

interface UserProfile {
  name: string;
  email: string;
  phone_number: string;
  role: string;
  

}
@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule,RouterModule,MatIconModule,EditProfileComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  dialogResult!: UserProfile;
 @Input() userProfile:UserProfile={
  name:"",
  email:"",
  phone_number:"",
  role:"",
 };

 constructor(private dialog: MatDialog,
  private _snackBar:MatSnackBar) {}

 openIcon() {
  let dataToPass:any=this.userProfile
   const dialogRef=this.dialog.open(EditProfileComponent, {
     data: { dataToPass }
   });
   
   dialogRef.afterClosed().subscribe((result:any) => {
    console.log(result)
    if(result){
      
      console.log(result)
    this.userProfile.name=result.name
    this.userProfile.email=result.email
    this.userProfile.phone_number=result.phone_number

    this._snackBar.open("Info Updated Successfully", "ok", {
      duration: 1500  // Set duration to 5 seconds (5000 milliseconds)
    });
    }
    else{
      this._snackBar.open("Email already exist or server error", "ok", {
        duration: 1500  // Set duration to 5 seconds (5000 milliseconds)
      });
    }
    

  });


 }

 

 
}
