import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule ,Validators} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthServiceService } from '../../Services/authService/auth-service.service';

@Component({
  selector: 'app-create-exercise',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule, MatFormFieldModule, MatInputModule,MatButton,MatSelectModule,MatIcon],
  templateUrl: './create-exercise.component.html',
  styleUrl: './create-exercise.component.css'
})
export class CreateExerciseComponent {
  constructor(private http: HttpClient,private _snackBar:MatSnackBar,private auth:AuthServiceService) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1500  // Set duration to 5 seconds (5000 milliseconds)
    });
  }

  clearForm() {
      this.studentForm.reset(this.getInitialFormValues()); // Reset with initial values
    
  }

  getInitialFormValues(): { studentList: FormGroup[] } {
    return { studentList: [this.getStudentFields()] }; // Provide initial values
  }

  studentForm: FormGroup = new FormGroup({
    studentList: new FormArray([this.getStudentFields()]),
  });

  getStudentFields(): FormGroup {
    return new FormGroup({
      exercise_name: new FormControl(""),
      category: new FormControl(""),
      sets:new FormControl('', [Validators.pattern(/^[0-9]+$/)]),
      reps:new FormControl('', [Validators.pattern(/^[0-9]+$/)]),
      estimated_time: new FormControl(""),
    });
  }

  studentListArray() {
    return this.studentForm.get("studentList") as FormArray;
  }

 
  activeButton(i:number){
    let tempStudentFormData = JSON.parse(JSON.stringify(this.studentForm.value));

let object= tempStudentFormData.studentList[i]
    if(object.category && object.exercise_name && object.estimated_time && object.sets &&object.reps){
      return true
    }

    return false
  }

  removeStudent(i: number) {
    this.studentListArray().removeAt(i);
  }

  addStudent(i:number) {
    this.studentListArray().push(this.getStudentFields());
  }


  getFormData() {
    let serverData: any = [],
      tempStudentFormData = JSON.parse(JSON.stringify(this.studentForm.value));
    tempStudentFormData.studentList.forEach((element: any) => {
      let tempObj: any = {
        exercise_name: element.exercise_name,
        category: element.category,
        sets: Number(element.sets),
        reps:Number(element.reps),
        estimated_time: element.estimated_time
      };

      if(tempObj.exercise_name.trim()=== ""||
      tempObj.category.trim()=== ""||
      tempObj.estimated_time.trim()=== ""
      ){
        
      }
      else{
        tempObj.subject = JSON.stringify(tempObj.subject);
        serverData.push(tempObj);

      }
    });

    
    
    console.log(serverData)
    if(serverData){
      const formData = serverData;
    const token = localStorage.getItem('authToken'); // Get the token from localStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Include the token in the headers
    });
    console.log(typeof(serverData[0].sets))

    function getApiUrl(){
      return "http://localhost:3000/exercise/createExercise"
    }

    this.http.post(getApiUrl(), formData, { headers })
      .subscribe(
        (response) => {
          console.log('Exercise created successfully:', response);
          // Handle the successful response
        },
        (error) => {
          console.error('Error creating exercise:', error);
          // Handle the error
        })
    }
    this.clearForm();
  
}}
