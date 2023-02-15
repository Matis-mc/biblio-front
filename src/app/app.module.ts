import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListingComponent } from './book-listing/book-listing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { AddBookComponent } from './add-book/add-book.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { LoanListingComponent } from './loan-listing/loan-listing.component';
import { AuthInterceptor } from './login-component/auth-interceptor';
import { AddLoanComponent } from './add-loan/add-loan.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdministrationComponent } from './administration/administration.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { HeaderComponent } from './header/header.component';
import { MatTabsModule } from '@angular/material/tabs';
import {  MatSnackBarModule } from '@angular/material/snack-bar'

const mats = [
  FormsModule,
  ReactiveFormsModule,
  MatAutocompleteModule,
  MatSelectModule,
  BrowserAnimationsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatExpansionModule,
  MatTooltipModule,
  MatGridListModule,
  MatMenuModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatSnackBarModule,
]

@NgModule({
  declarations: [
    AppComponent,
    BookListingComponent,
    AddBookComponent,
    StudentViewComponent,
    LoginComponentComponent,
    LoanListingComponent,
    AddLoanComponent,
    AdministrationComponent,
    UserListingComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    mats,
    BrowserAnimationsModule,
  ],
  exports: [
    mats
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
