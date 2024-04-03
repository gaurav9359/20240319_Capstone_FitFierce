import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-exercise',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './create-exercise.component.html',
  styleUrl: './create-exercise.component.css'
})
export class CreateExerciseComponent {
  constructor(){

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
      exercise_category: new FormControl(""),
      exercise_sets:new FormControl(""),
      exercise_time: new FormControl(""),
    });
  }

  studentListArray() {
    return this.studentForm.get("studentList") as FormArray;
  }

  addStudent(i:number) {
    this.studentListArray().push(this.getStudentFields());
  }

  activeButton(i:number){
    let tempStudentFormData = JSON.parse(JSON.stringify(this.studentForm.value));

let object= tempStudentFormData.studentList[i]
console.log("boje",object)
    if(object.exercise_category && object.exercise_name && object.exercise_time && object.exercise_sets){
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
        exercise_category: element.exercise_category,
        exercise_sets: element.exercise_sets,
        exercise_ETC: element.exercise_time
      };

      if(tempObj.exercise_name.trim()=== ""||
      tempObj.exercise_category.trim()=== ""||
      tempObj.exercise_sets.trim()=== ""||
      tempObj.exercise_ETC.trim()=== ""
      ){
        
      }
      else{
        tempObj.subject = JSON.stringify(tempObj.subject);
        serverData.push(tempObj);

      }

      
      
    });
    
    console.log(serverData);  // This is the variable which contain all the form data
    this.clearForm();
  
}}
