import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { condition } from '../enum/condition';
import { BookListingService } from '../service/book-listing.service';
import { Book } from '../interface/Book';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  eConditions = condition;
  selected = this.eConditions.Bon;

  title: string = '';
  author: string = '';
  year: string = '';
  
  constructor(private bookSrv : BookListingService, private _snackBar: MatSnackBar) { }

  public valider(){
    let book : Book = {
      title: this.title,
      author: this.author,
      year: this.year,
      condition:this.selected,
      imageUrl: '',
    }
    this.bookSrv.saveBook(book).subscribe( res => {
      
      if(res)
      this.title ='';
      this.year = '';
      this.author = '';
      this.selected = this.eConditions.Bon
      this._snackBar.open("Livre enregistré !", "FERMER",{duration:2000});
      console.log(res)
    }
      );
    console.log(book)
  }

  ngOnInit(): void {
  }

}
