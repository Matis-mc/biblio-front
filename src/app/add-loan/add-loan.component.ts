import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, ReplaySubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from '../auth/auth-service';
import { Book } from '../interface/Book';
import { Books } from '../interface/Books';
import { Loan } from '../interface/Loan';
import { BookListingService } from '../service/book-listing.service';
import { LoanListingService } from '../service/loan-listing.service';

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.scss']
})
export class AddLoanComponent implements OnInit {

  book$ : ReplaySubject<Book[]> = new ReplaySubject();  
  titles : string[] = [];
  filteredTitle$: Observable<string[]>;
  titleSelectControl = new FormControl('');

  bookSelected : Book;
  dateOfBorrow = new Date();

  constructor(private loanSrv:LoanListingService, 
    private bookSrv:BookListingService, 
    private authSrv: AuthService,
    private _snackBar: MatSnackBar) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.titles.filter(title => title.toLowerCase().includes(filterValue));
  }

  public updateTitleList(books : Book[]){
    this.titles = [];
    books.forEach(book =>{
      this.titles.push(book.title);
    })
}

public filterTitleList(){
  this.filteredTitle$ = this.titleSelectControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || '')),
  );
}

  public getAllBooks(){
    this.bookSrv.getAll().subscribe((books: Books) => {
      this.updateTitleList(books.books);
    });
  }

  public getBookFromResearch(){
    this.bookSrv.getBookFromTitle(this.titleSelectControl.value).subscribe((books: Books) => {
      this.book$.next(books.books);
    });
  }

  public setBookSelected(book : Book){
    this.bookSelected = book;    
  }

  public saveLoan(){
    console.log(this.bookSelected)
    let loan:Loan = {
      _id:'',
      _idBook:this.bookSelected._id,
      _idUser:this.authSrv.getUserID(),
      titleBook:this.bookSelected.title, 
      nameUser:this.authSrv.getUserName(),
      dateOfBorrow:this.dateOfBorrow, 
      dateOfReturn:null
    }
    this.loanSrv.saveLoan(loan).subscribe(
      res =>  {
        this._snackBar.open("Emprunt enregistré !", "FERMER",{duration:2000});
      }
    );

  }


  ngOnInit(): void {
    this.getAllBooks();
    this.filterTitleList();
  }

}
