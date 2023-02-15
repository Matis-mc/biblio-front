import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { BookListingComponent } from './book-listing/book-listing.component';
import { LoanListingComponent } from './loan-listing/loan-listing.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { StudentViewComponent } from './student-view/student-view.component';

const routes: Routes = [
  {path:'', component:LoginComponentComponent},
  {path: 'bibliotheque', component:StudentViewComponent},
  {path: 'administration', component:AdministrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
