
import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { AuthProviders, AuthMethods, AngularFireModule } from 'angularfire2';

import { MainPage } from './main.page';
import { LoginPage } from './login.page';
import { OverviewPage } from './overview.page';

const routes: Routes = [
  {path: 'login', component: LoginPage},
  {path: 'overview', component: OverviewPage},
  {path: '**', redirectTo: '/overview', pathMatch: 'full'}
];

const firebaseConfig = {
  apiKey: "AIzaSyBjoHF2tKDUEXDUOh3wRI-54ilpgRl_JnI",
  authDomain: "customerdb-9b7c3.firebaseapp.com",
  databaseURL: "https://customerdb-9b7c3.firebaseio.com",
  storageBucket: "customerdb-9b7c3.appspot.com",
  messagingSenderId: "1098474460056"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    MaterializeModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  declarations: [
    MainPage,
    LoginPage,
    OverviewPage
  ],
  bootstrap: [
    MainPage
  ]
})
export class AppModule {

}
