import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, ReplaySubject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Book } from '../interface/Book';
import { Books } from '../interface/Books';
import { AuthInterceptor } from '../login-component/auth-interceptor';
import { BookListingService } from '../service/book-listing.service';

@Component({
  selector: 'app-book-listing',
  templateUrl: './book-listing.component.html',
  styleUrls: ['./book-listing.component.scss']
})
export class BookListingComponent implements OnInit {

  @Input()
  type: string;

  @Input()
  display: string;

  titleSelectControl = new FormControl('');
  panelOpenState = false;

  bookAction = 'test';
  book$ : ReplaySubject<Book[]> = new ReplaySubject();
  titles : string[] = [];
  filteredTitle$: Observable<string[]>;
  addBookWindow = false;


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.titles.filter(title => title.toLowerCase().includes(filterValue));
  }

  constructor( public bookSrv: BookListingService, public authSrv:AuthInterceptor) { 

  }

  public getAllBooks(){
    this.bookSrv.getAll().subscribe((books: Books) => {
      this.book$.next(books.books);
      this.updateTitleList(books.books);
    });
  }

  public getBookFromResearch(){
    this.bookSrv.getBookFromTitle(this.titleSelectControl.value).subscribe((books: Books) => {
      this.book$.next(books.books);
    });
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

  ngOnInit(): void {
      this.getAllBooks();
      this.filterTitleList();
            if(this.type == "BIBLIOTHEQUE"){
          this.bookAction = "cliquer pour emprunter"
      }
      if(this.type == "ADMINISTRATION"){
        this.bookAction = "cliquer pour voir précédents possesseurs"
      };
  }

}
