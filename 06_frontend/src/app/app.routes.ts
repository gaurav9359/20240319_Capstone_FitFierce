import { Routes } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { SigninPageComponent } from './Pages/signin-page/signin-page.component';
import { SignupPageComponent } from './Pages/signup-page/signup-page.component';
import { UserDashboardComponent } from './Pages/user/user-dashboard/user-dashboard.component';
export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'signin', component: SigninPageComponent },
    { path: 'signup', component: SignupPageComponent },
    { path: 'user', component: UserDashboardComponent },
];
