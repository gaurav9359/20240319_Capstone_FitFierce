import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-manage-exercise',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule, MatFormFieldModule, MatInputModule,MatSelectModule],
  templateUrl: './manage-exercise.component.html',
  styleUrl: './manage-exercise.component.css'
})
export class ManageExerciseComponent implements OnInit{
  studentForm: FormGroup = new FormGroup({
    studentList: new FormArray([this.getStudentFields()]),
  });

  constructor(private http: HttpClient,private ngZone:NgZone){}

  getStudentFields(): FormGroup {
    return new FormGroup({
      exercise_name: new FormControl(""),
      category: new FormControl(""),
      sets:new FormControl(""),
      estimated_time: new FormControl(""),
    });
  }
  values:any=[];
  getValues(){
    return this.values
  }
  status=false
  ngOnInit(): void {
    let dataReceived!: any;
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    
  
    this.http
      .get('http://localhost:3000/exercise/readExercise', { headers })
      .subscribe(
        (response) => {
          dataReceived = response;
          if (dataReceived === null) {
            // Handle the case when no data is received
          } else {
            // Loop through received meals and create form groups
            this.ngZone.run(() => {
              for (const exercise of dataReceived.userExercises[0].exercises) {
                console.log(exercise);
                this.values.push(exercise);
              }
              console.log(this.values);
            });
          }
        },
        (error) => {
          console.error('Error Reading Diet:', error);
        }
      );
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
    if(object.category && object.exercise_name && object.estimated_time && object.sets){
      return true
    }

    return false
  }

  removeStudent(i: number) {
    this.studentListArray().removeAt(i);
  }


  getFormData() {
    
  
}
}
