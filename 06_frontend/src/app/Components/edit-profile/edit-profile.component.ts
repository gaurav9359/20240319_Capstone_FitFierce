import { Component,Inject, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/authService/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import {MatIconModule} from '@angular/material/icon';

interface profileDetails{
  name:string;
  email:string;
  phone_number:string
}
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [MatIconModule,ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,CommonModule,],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{
  trainerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {dataToPass:profileDetails},
    public http:HttpClient,
  ) {
    

    this.trainerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      phone_number: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(255)]]
    });
  }
  
  ngOnInit(): void {
    this.trainerForm.get('name')?.setValue(this.data.dataToPass.name)
    this.trainerForm.get('email')?.setValue(this.data.dataToPass.email)
    this.trainerForm.get('phone_number')?.setValue(this.data.dataToPass.phone_number)
    
  }

  onSubmit(){
    console.log("oreno")
  }

  closeDialog(): void {
    const token= this.authService.getToken()
    let trainerDetailsToReturn:any
    let trainerDetails:any= this.trainerForm.value

    if(token){
      this.http.put<any>('http://localhost:3000/user/updateUser',trainerDetails,{headers:{
        'Authorization':`Bearer ${token}`
      }}).subscribe(response=>
          {

            trainerDetailsToReturn={
              name:response.newdata.updatedData.name,
              email:response.newdata.updatedData.email,
              phone_number:response.newdata.updatedData.phone_number,
              role:'user'
            }
            console.log("oreno",trainerDetailsToReturn)
            this.dialogRef.close(trainerDetailsToReturn);
          }, error => {
            console.log('executre')
            trainerDetailsToReturn=null
            console.error('Error updating user:', error);
            this.dialogRef.close(trainerDetailsToReturn);
            // Handle errors appropriately (e.g., display error message)
          });
          
    
    }else {
      console.error('Authorization token required for update');
      // Handle missing token scenario (e.g., prompt for login)
    }
   
    console.log('oo',trainerDetailsToReturn)
                    
  }
}
