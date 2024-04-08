import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule ,Validators} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-exercise',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './create-exercise.component.html',
  styleUrl: './create-exercise.component.css'
})
export class CreateExerciseComponent {
  constructor(private http: HttpClient) { }


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
      estimated_time: new FormControl(""),
    });
  }

  studentListArray() {
    return this.studentForm.get("studentList") as FormArray;
  }

 
  activeButton(i:number){
    let tempStudentFormData = JSON.parse(JSON.stringify(this.studentForm.value));

let object= tempStudentFormData.studentList[i]
    if(object.category && object.exercise_name && object.estimated_time && object.sets){
      return true
    }

    return false
  }

  removeStudent(i: number) {
    this.studentListArray().removeAt(i);
  }


  getFormData() {
    let serverData: any = [],
      tempStudentFormData = JSON.parse(JSON.stringify(this.studentForm.value));
    tempStudentFormData.studentList.forEach((element: any) => {
      let tempObj: any = {
        exercise_name: element.exercise_name,
        category: element.category,
        sets: Number(element.sets),
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

    this.http.post('http://localhost:3000/exercise/createExercise', formData, { headers })
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
