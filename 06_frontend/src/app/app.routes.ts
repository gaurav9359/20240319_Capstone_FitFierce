import { Routes } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { SigninPageComponent } from './Pages/signin-page/signin-page.component';
import { SignupPageComponent } from './Pages/signup-page/signup-page.component';
import { UserDashboardComponent } from './Pages/user/user-dashboard/user-dashboard.component';
import { ProfilePageComponent } from './Pages/user/profile-page/profile-page.component';
import { HistoryPageComponent } from './Pages/user/history-page/history-page.component';
import { BuyPageComponent } from './Pages/user/buy-page/buy-page.component';
import { CreateGoalsComponent } from './Pages/user/create-goals/create-goals.component';
export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'signin', component: SigninPageComponent },
    { path: 'signup', component: SignupPageComponent },
    { path: 'user', component: UserDashboardComponent },
    { path: 'profile', component: ProfilePageComponent },
    { path: 'history', component: HistoryPageComponent },
    { path: 'buy', component: BuyPageComponent },
    { path: 'creategoals', component: CreateGoalsComponent },
];
