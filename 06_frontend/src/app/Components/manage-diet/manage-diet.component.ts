import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DietDetailsComponent } from '../diet-details/diet-details.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-manage-diet',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIcon,
    MatButton,
  ],
  templateUrl: './manage-diet.component.html',
  styleUrls: ['./manage-diet.component.css'],
})
export class ManageDietComponent implements OnInit,OnChanges {
  @Input() status: string = '';
  studentForm: FormGroup = new FormGroup({
    studentList: new FormArray([this.getStudentFields()]),
  });
  filteredData: any[] = [];
  updateStatus:any[]=[]

  getInitialFormValues(): { studentList: FormGroup[] } {
    return { studentList: [this.getStudentFields()] }; // Provide initial values
  }

  values: any = [];
  getValues() {
    return this.filteredData;
  }

  constructor(private http: HttpClient, private ngZone: NgZone,private router:Router,public _snackbar:MatSnackBar,private dialog: MatDialog) {}

  getStudentFields(): FormGroup {
    return new FormGroup({
      diet_name: new FormControl(''),
      categories: new FormControl(''),
      quantity: new FormControl(''),
      time_toeat: new FormControl(''),
      status: new FormControl("")
    });
  }

  selectedStatus: string = 'done';

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
  
    this.http
      .get('http://localhost:3000/diet/getDietToday', { headers })
      .subscribe(
        (response) => {
          console.log(response);
          let dataReceived:any = response;
          console.log(dataReceived);
          if (dataReceived === null) {
            // Handle the case when no data is received
          } else {
            this.values=[]
            // Loop through received meals and create form groups
            this.ngZone.run(() => {
              for (const meal of dataReceived.userDietPlan.meals) {
                console.log(meal);
                this.values.push(meal);
              }
              this.filterData();
            });
          }
        },
        (error) => {
          console.error('Error Reading Diet:', error);
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
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  

    this.http.put(`http://localhost:3000/diet/updateDietStatus`, this.updateStatus, { headers })
      .subscribe(
        (response) => {
          console.log('Exercise status updated successfully:', response);
          this._snackbar.open("Exercise Status Updated Successfully","",{
            duration:1500
          })
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
          mealId: student._id,
          isDone: selectedValue
      })
    }
    
  }

  addDiet(){
    this.router.navigateByUrl('/creategoals')
  }
  addTrainer(){
    this.router.navigateByUrl('/buy')
  }

  async showInfo(i:number){
    const dietPlan= this.getValues()
    
    let query:string= `${dietPlan[i].quantity} ${dietPlan[i].measurement} ${dietPlan[i].diet_name}`

    let dietDetails:any=await this.getDietDetails(query)
    console.log(dietDetails)
    if(dietDetails===''){
      this._snackbar.open("No Details Found For This Diet","Ok",{
        duration:1500
      })
    }
    else{
   const dialogRef=this.dialog.open(DietDetailsComponent, {
     data: { dietDetails }
   });
    }
  }

  async getDietDetails(query:string){
    const apiUrl = 'https://api.api-ninjas.com/v1/nutrition?query=' + query;
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

