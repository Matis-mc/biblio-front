import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Book } from "../interface/Book";
import { ReplaySubject, Observable } from "rxjs";
import { Books } from "../interface/Books";


@Injectable({
    providedIn: 'root'
  })
export class BookListingService {

    UrlBook = "http://localhost:3000/book"

    constructor(private http : HttpClient) { }

    getBookFromTitle(title:string): Observable<Books>{
        return this.http.get<Books>(this.UrlBook.concat("/title/").concat(title));
    }

    saveBook(book:Book){
        return this.http.post(this.UrlBook, book);
    }

    
    getAll(): Observable<Books> {
       return this.http.get<Books>(this.UrlBook);
      }
  
  }