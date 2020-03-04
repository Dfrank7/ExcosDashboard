import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { SiteLayoutComponent } from '../site-layout/site-layout/site-layout.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { AddExcosComponent } from '../add-excos/add-excos.component';
import { EditExcoComponent } from '../edit-exco/edit-exco.component';
import {BlogComponent} from '../blog/blog.component
  import { from } from 'rxjs';

const routes:Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'test',
    component:AppComponent
  },
   //Site routes goes here 
   {
    path: '',
    component: SiteLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-excos', component: AddExcosComponent },
      { path: 'edit-excos', component: EditExcoComponent },
      { path: 'apps', component: BlogComponent },


    ]
  },

  // //no layout routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  // declarations: []
})
export class AppRoutingModule { }
