import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponentComponent } from './components/first-component/first-component.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { EditPersonScreenComponent } from './components/edit-person-screen/edit-person-screen.component';

const routes: Routes = [
  {path: '', component: FirstComponentComponent},
  {path: 'edit-person/:id', component: EditPersonScreenComponent},
  {path: 'add-person', component: AddPersonComponent}
  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
