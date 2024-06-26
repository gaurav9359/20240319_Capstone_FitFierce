import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DietDetailsComponent } from '../diet-details/diet-details.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-manage-exercise',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,MatProgressBar,MatButtonModule,MatIcon],
  templateUrl: './manage-exercise.component.html',
  styleUrls: ['./manage-exercise.component.css']
})
export class ManageExerciseComponent implements OnInit,OnChanges {
  @Input() status: string = '';
  studentForm: FormGroup = new FormGroup({
    studentList: new FormArray([this.getStudentFields()])
  });
  filteredData: any[] = [];
  values: any = [];

  updateStatus:any[]=[]

  constructor(private http: HttpClient, private ngZone: NgZone,private router:Router,public _snackbar:MatSnackBar,private dialog: MatDialog) { }

  getStudentFields(): FormGroup {
    return new FormGroup({
      exercise_name: new FormControl(""),
      category: new FormControl(""),
      sets: new FormControl(""),
      estimated_time: new FormControl(""),
      status: new FormControl("")
    });
  }

  getValues() {
    return this.filteredData;
  }

  
  ngOnInit(): void {
    let dataReceived!: any;
    this.fetchData()
  }
  
  ngOnChanges(changes: { [key: string]: any }) {
    if (changes['status']) {
      this.fetchData();
    }
  }
  fetchData(){
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get('http://localhost:3000/exercise/readExercise', { headers })
      .subscribe(
        (response) => {
          let dataReceived:any = response;
          if (dataReceived === null) {
            // Handle the case when no data is received
          } else {
            this.values=[]
            // Loop through received exercises and create form groups
            this.ngZone.run(() => {
              for (const exercise of dataReceived.userExercises[0].exercises) {
                
                this.values.push(exercise);
              }
              this.filterData();
            });
          }
        },
        (error) => {
          console.error('Error Reading Exercise:', error);
        }
      );
  }

  filterData() {
    switch (this.status) {
      case 'pending':
        this.filteredData = this.values.filter((item: any) => !item.isDone);
        break;
      case 'completed':
        this.filteredData = this.values.filter((item: any) => item.isDone);
        break;
      default:
        this.filteredData = this.values;
        break;
    }
  }

  studentListArray() {
    return this.studentForm.get("studentList") as FormArray;
  }

  addStudent(i: number) {
    this.studentListArray().push(this.getStudentFields());
  }

  selectedStatus: string = 'done';

  activeButton(i: number) {
    let tempStudentFormData = JSON.parse(JSON.stringify(this.studentForm.value));
    let object = tempStudentFormData.studentList[i];
    return object.category && object.exercise_name && object.estimated_time && object.sets;
  }

  removeStudent(i: number) {
    this.studentListArray().removeAt(i);
  }

  getFormData() {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
    this.http.put(`http://localhost:3000/exercise/updateStatus`, this.updateStatus, { headers })
      .subscribe(
        (response) => {
          console.log('Exercise status updated successfully:', response);
          
          // Fetch the latest data from the server
          this.fetchData();
          
          // Clear the updateStatus array after successful updates
          this.updateStatus = [];
        },
        (error) => {
          console.error('Error updating exercise status:', error);
          // Handle errors (display error message, retry logic)
        }
      );
  
    // Reset the form or perform other actions
    this.studentForm.reset();
  }
  onStatusChange(student:any,event:any){
    let selectedValue=(event.value=='done')?true:false
    console.log(selectedValue)
    console.log(student.isDone)
    if(student.isDone!==selectedValue){
      this.updateStatus.push({
          exerciseId: student._id,
          isDone: selectedValue
      })
    }
    
  }

  addExercise(){
    this.router.navigateByUrl('/creategoals')
  }
  addTrainer(){
    this.router.navigateByUrl('/buy')
  }
  
  async showInfo(i:any){
    const exercisePlan=this.getValues()

    let query:string= exercisePlan[i].exercise_name;

    let exerciseDetails:any=await this.getExerciseDetails(query)

    if(exerciseDetails===''){
      this._snackbar.open("No Details Found For This Diet","Ok",{
        duration:1500
      })
    }
    else{
   const dialogRef=this.dialog.open(DietDetailsComponent, {
     data: { exerciseDetails }
   });
    }
  }

  async getExerciseDetails(query:string){
    const apiUrl= 'https://api.api-ninjas.com/v1/exercises?name='+query;
const apiKey = 'whji1LpxIo/Eb+jR/MuSdQ==6toI28xFkjwFiX2d';
  

  const headers = new HttpHeaders({
    'X-Api-Key': apiKey
  });
  try {
    const response = await this.http.get<any>(apiUrl, { headers }).toPromise();
    console.log("reno",response)
    return response.length===0?'':response[0];
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}
}