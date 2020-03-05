import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SiteLayoutComponent } from './site-layout/site-layout/site-layout.component';
import { HeaderComponent } from './site-layout/header/header.component';
import { FooterComponent } from './site-layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AddExcosComponent } from './add-excos/add-excos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditExcoComponent } from './edit-exco/edit-exco.component';
import { BlogComponent } from './blog/blog.component';
import { AddBlogsComponent } from './add-blogs/add-blogs.component';


const config = {
  apiKey: 'AIzaSyCsNM-7ZZibvB-HE5OdftErI5aiJSc55eM',
  projectId: 'nfcsapp',
  storageBucket: 'gs://nfcsapp.appspot.com',
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SiteLayoutComponent,
    HeaderComponent,
    FooterComponent,
    AddExcosComponent,
    EditExcoComponent,
    BlogComponent,
    AddBlogsComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage

    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
