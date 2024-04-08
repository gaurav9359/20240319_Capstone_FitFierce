import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgZone } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-manage-diet',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './manage-diet.component.html',
  styleUrls: ['./manage-diet.component.css'],
})
export class ManageDietComponent implements OnInit {
  studentForm: FormGroup = new FormGroup({
    studentList: new FormArray([this.getStudentFields()]),
  });

  getInitialFormValues(): { studentList: FormGroup[] } {
    return { studentList: [this.getStudentFields()] }; // Provide initial values
  }

  values: any = [];
  getValues(){
    return this.values
  }
  status=false

  constructor(private http: HttpClient, private ngZone: NgZone) {}

  getStudentFields(): FormGroup {
    return new FormGroup({
      diet_name: new FormControl(''),
      categories: new FormControl(''),
      quantity: new FormControl(''),
      time_toeat: new FormControl(''),
    });
  }

  ngOnInit(): void {
    let dataReceived!: any;
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
    this.http
      .get('http://localhost:3000/diet/getDietToday', { headers })
      .subscribe(
        (response) => {
          console.log(response);
          dataReceived = response;
          console.log(dataReceived);
          if (dataReceived === null) {
            // Handle the case when no data is received
          } else {
            // Loop through received meals and create form groups
            this.ngZone.run(() => {
              for (const meal of dataReceived.userDietPlan.meals) {
                console.log(meal);
                this.values.push(meal);
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
    return this.studentForm.get('studentList') as FormArray;
  }

  addStudent(i: number) {
    this.studentListArray().push(this.getStudentFields());
  }

  activeButton(i: number) {
    // ... existing logic for button activation ...
  }

  removeStudent(i: number) {
    this.studentListArray().removeAt(i);
  }

  getFormData() {
    // ... existing logic to handle form data submission ...
  }
}
