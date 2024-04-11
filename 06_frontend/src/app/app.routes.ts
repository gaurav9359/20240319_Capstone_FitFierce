import { Routes } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { SigninPageComponent } from './Pages/signin-page/signin-page.component';
import { SignupPageComponent } from './Pages/signup-page/signup-page.component';
import { UserDashboardComponent } from './Pages/user/user-dashboard/user-dashboard.component';
import { ProfilePageComponent } from './Pages/user/profile-page/profile-page.component';
import { HistoryPageComponent } from './Pages/user/history-page/history-page.component';
import { BuyPageComponent } from './Pages/user/buy-page/buy-page.component';
import { CreateGoalsComponent } from './Pages/user/create-goals/create-goals.component';
import { ManageExerciseComponent } from './Components/manage-exercise/manage-exercise.component';
import { SignupUserComponent } from './Pages/signup-user/signup-user.component';
import { ManageGoalPageComponent } from './Pages/user/manage-goal-page/manage-goal-page.component';
import { CreateGoalsTrainerComponent } from './Pages/trainer/create-goals-trainer/create-goals-trainer.component';
import { HistoryTrainerComponent } from './Pages/trainer/history-trainer/history-trainer.component';
import { SubscribedUserComponent } from './Components/subscribed-user/subscribed-user.component';
import { ProfileTrainerComponent } from './Pages/trainer/profile-trainer/profile-trainer.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'signin', component: SigninPageComponent },
    { path: 'signuptrainer', component: SignupPageComponent },
    { path: 'signup', component: SignupUserComponent },
    { path: 'user', component: ProfilePageComponent },
    { path: 'trainer', component: CreateGoalsTrainerComponent },
    { path: 'trainerprofile', component: ProfileTrainerComponent },
    { path: 'profile', component: ProfilePageComponent },
    { path: 'history', component: HistoryPageComponent },
    { path: 'historytrainer', component: HistoryTrainerComponent },
    { path: 'buy', component: BuyPageComponent },
    { path: 'creategoals', component: CreateGoalsComponent },
    { path: 'managegoal', component: ManageGoalPageComponent },
    { path: 'subscribers', component: SubscribedUserComponent },
    { path: 'home', component: UserDashboardComponent },

];
