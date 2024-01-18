import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponentComponent } from './components/first-component/first-component.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { EditDeleteComponent } from './components/edit-delete/edit-delete.component';
import { EditPersonScreenComponent } from './components/edit-person-screen/edit-person-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponentComponent,
    AddPersonComponent,
    EditDeleteComponent,
    EditPersonScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
