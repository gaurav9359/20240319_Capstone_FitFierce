import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-create-diet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule, MatFormFieldModule, MatInputModule,MatButton,MatSelectModule,MatIcon],
  templateUrl: './create-diet.component.html',
  styleUrl: './create-diet.component.css'
})
export class CreateDietComponent {
  studentForm: FormGroup = new FormGroup({
    studentList: new FormArray([this.getStudentFields()]),
  });

  clearForm() {
    this.studentForm.reset(this.getInitialFormValues()); // Reset with initial values
  
}
constructor(private http: HttpClient,private _snackBar:MatSnackBar){}

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 1500  // Set duration to 5 seconds (5000 milliseconds)
  });
}

getInitialFormValues(): { studentList: FormGroup[] } {
  return { studentList: [this.getStudentFields()] }; // Provide initial values
}

  getStudentFields(): FormGroup {
    return new FormGroup({
      diet_name: new FormControl(""),
      calories: new FormControl(""),
      quantity:new FormControl(""),
      time_toeat: new FormControl(""),
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
console.log(object)
    if(object.calories && object.diet_name && object.time_toeat && object.quantity){
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
        diet_name: element.diet_name,
        quantity: Number(element.calories),
        calories: Number(element.quantity),
        time_toEat: element.time_toeat
      };
      
      if(tempObj.diet_name.trim()===""|| tempObj.time_toEat.trim()===""){

      }
      else{

        tempObj.subject = JSON.stringify(tempObj.subject);
        serverData.push(tempObj);
        console.log(tempObj)
      }
    });
    
    console.log(serverData);  // This is the variable which contain all the form data

    if(serverData){
      const formData = serverData;
      console.log(formData)
    const token = localStorage.getItem('authToken'); // Get the token from localStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Include the token in the headers
    });
    // console.log(typeof(serverData[0].sets))

    this.http.post('http://localhost:3000/diet/createDiet', formData, { headers })
      .subscribe(
        (response) => {
          console.log('Diet created successfully:', response);
          // Handle the successful response
        },
        (error) => {
          console.error('Error creating exercise:', error);
          // Handle the error
        })
    }

    this.clearForm();
  
}
async getCalories(i: number) {
  const studentFormArray = this.studentForm.get('studentList') as FormArray;
  const studentFormGroup = studentFormArray.at(i) as FormGroup;

  
  let query:string= `${studentFormGroup.value.quantity} ${studentFormGroup.value.diet_name}`
  console.log("fruit",query)
  let caloriesToPut=await this.getNutritionData(query)
  
  console.log("caloriesto",caloriesToPut)
  // Set the calories value manually
  studentFormGroup.patchValue({
    calories: caloriesToPut
  });
}

async getNutritionData(query: string): Promise<any> {
  const apiUrl = 'https://api.api-ninjas.com/v1/nutrition?query=' + query;
  const apiKey = 'whji1LpxIo/Eb+jR/MuSdQ==6toI28xFkjwFiX2d';

  const headers = new HttpHeaders({
    'X-Api-Key': apiKey
  });

  try {
    const response = await this.http.get<any>(apiUrl, { headers }).toPromise();
    return response[0]===''?'':response[0].calories;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}
}
