interface Meal {
    calories: number;
    diet_name: string;
    isDone: boolean;
    quantity: number;
    time_toEat: string;
    _id: string;
  }

  interface Exercise {
    exercise_name: string;
    category: string;
    sets: number;
    estimated_time: string; // Might need adjustments depending on time format requirements
    isDone: boolean;
    _id?: string; // Optional property for ID, marked with a question mark (?)
  }