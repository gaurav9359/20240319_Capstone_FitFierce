import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../Services/authService/auth-service.service';

interface Exercise {
  _id: string;
  exercise_name: string;
  category: string;
  sets: number;
  estimated_time: string;
  isDone: boolean;
  date:Date;
}

interface UserExercise {
  _id: string;
  userid: string;
  exercises: Exercise[];
  __v: number;
}

interface Diet {
  _id: string;
  diet_name: string;
  quantity: number;
  calories: number;
  time_toEat: string;
  isDone: boolean;
  date: Date;
}

@Component({
  selector: 'app-history-component',
  standalone: true,
  imports: [MatTableModule,MatBadgeModule, MatButtonModule, MatIconModule,CommonModule],
  templateUrl: './history-component.component.html',
  styleUrl: './history-component.component.css'
})
export class HistoryComponentComponent implements OnInit{
  getRole():any{
    console.log("oreno",this.auth.getRole())
    if(this.auth.getRole()==='user'){
      return 'user'
    }
    return 'trainer'
  }

  exerciseDisplayedColumns: string[] = this.getRole()==='user'?[ 'exerciseName', 'category', 'sets', 'estimatedTime', 'isDone','date']:[ 'exerciseName', 'category', 'sets', 'estimatedTime','date'];
  exerciseDataSource: MatTableDataSource<Exercise> = new MatTableDataSource<Exercise>([]);

  

  dietDisplayedColumns: string[] = this.getRole()==='user'?['dietName', 'quantity', 'calories', 'timeToEat', 'isDone', 'date']:['dietName', 'quantity', 'calories', 'timeToEat', 'date'];
  dietDataSource: MatTableDataSource<Diet> = new MatTableDataSource<Diet>([]);

  constructor(private http: HttpClient,private auth:AuthServiceService) {}


  
  ngOnInit(): void {
    this.fetchDietHistory();
    this.fetchExerciseHistory();
  }

  fetchExerciseHistory(): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any>('http://localhost:3000/exercise/getAllExercise', { headers }).subscribe(
      (response) => {
          if(response){
            console.log("jjj",response)
            const exercise = response.exercises
            this.exerciseDataSource.data = exercise;
            console.log(this.exerciseDataSource.data)
  
          }
      },
      (error) => {
        console.error('Error fetching exercise history:', error);
      }
    );
  }

  fetchDietHistory(): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any>('http://localhost:3000/diet/getAllDiet', { headers }).subscribe(
      (response) => {
        if(response){
          console.log(response)
          const diets = response.meals
          this.dietDataSource.data = diets;
          console.log(this.dietDataSource.data)

        }
        
      },
      (error) => {
        console.error('Error fetching diet history:', error);
      }
    );
  }
}
