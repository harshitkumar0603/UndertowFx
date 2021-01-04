import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent}
];

export const AppRoutingModule = RouterModule.forRoot(routes);
