import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Loan } from "../interface/Loan";
import { ReplaySubject, Observable } from "rxjs";
import { Loans } from "../interface/Loans";


@Injectable({
    providedIn: 'root'
  })
export class LoanListingService {

    UrlLoan = "http://localhost:3000/loan"

    constructor(private http : HttpClient) { }

    getLoanFromTitleBook(title:string): Observable<Loans>{
        return this.http.get<Loans>(this.UrlLoan.concat("/title/").concat(title));
    }

    saveLoan(loan:Loan){
        return this.http.post(this.UrlLoan, loan);
    }

    
    getAll(): Observable<Loans> {
       return this.http.get<Loans>(this.UrlLoan);
      }
    
    getUserLoan(id):Observable<Loans> {
        return this.http.get<Loans>(this.UrlLoan + "/user/" + id);
       }
  
  }