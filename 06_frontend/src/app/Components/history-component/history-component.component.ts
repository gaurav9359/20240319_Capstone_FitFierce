import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

interface Exercise {
  _id: string;
  exercise_name: string;
  category: string;
  sets: number;
  estimated_time: string;
  isDone: boolean;
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
  imports: [MatTableModule],
  templateUrl: './history-component.component.html',
  styleUrl: './history-component.component.css'
})
export class HistoryComponentComponent implements OnInit{
  exerciseDisplayedColumns: string[] = ['date', 'exerciseName', 'category', 'sets', 'estimatedTime', 'isDone'];
  exerciseDataSource: MatTableDataSource<Exercise> = new MatTableDataSource<Exercise>([]);

  dietDisplayedColumns: string[] = ['dietName', 'quantity', 'calories', 'timeToEat', 'isDone'];
  dietDataSource: MatTableDataSource<Diet> = new MatTableDataSource<Diet>([]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.fetchExerciseHistory();
    this.fetchDietHistory();
  }

  fetchExerciseHistory(): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any>('http://localhost:3000/exercise/readExercise', { headers }).subscribe(
      (response) => {
        console.log(response)
        // const exercises: Exercise[] = response.userExercises.flatMap(userExercise => userExercise.exercises.map(exercise => ({
        //   ...exercise,
        //   // date: new Date(userExercise.date)
        // })));
        // this.exerciseDataSource.data = exercises;
      },
      (error) => {
        console.error('Error fetching exercise history:', error);
      }
    );
  }

  fetchDietHistory(): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<{ userDietPlan: { meals: Diet[] } }>('http://localhost:3000/diet/getDietToday', { headers }).subscribe(
      (response) => {
        const diets = response.userDietPlan.meals.map(meal => ({
          ...meal,
          // date: new Date(response.userDietPlan.date)
        }));
        this.dietDataSource.data = diets;
        console.log(this.dietDataSource.data)
      },
      (error) => {
        console.error('Error fetching diet history:', error);
      }
    );
  }
}
