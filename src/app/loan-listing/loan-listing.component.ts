import { Component, Input, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Loan } from '../interface/Loan';
import { Loans } from '../interface/Loans';
import { LoanListingService } from '../service/loan-listing.service';

@Component({
  selector: 'app-loan-listing',
  templateUrl: './loan-listing.component.html',
  styleUrls: ['./loan-listing.component.scss']
})
export class LoanListingComponent implements OnInit {

  @Input()
  type : string;

  @Input()
  display: string;

  panelOpenState = false;
  loan$ : ReplaySubject<Loan[]> = new ReplaySubject();

  constructor(private loanSrv : LoanListingService) { 
  }

  public getAllLoans(){
    this.loanSrv.getAll().subscribe((loans: Loans) => {
      this.loan$.next(loans.loans);
    });
  }

  public getUserLoans(){
    this.loanSrv.getUserLoan(localStorage.getItem("userID")).subscribe((loans: Loans) => {
      this.loan$.next(loans.loans);
    });
  }

  setLoans(){
    if(this.type == "BIBLIOTHEQUE"){
      this.getUserLoans();
    }
    if(this.type == "ADMINISTRATION"){
      this.getAllLoans();
    };
  }

  ngOnInit(): void {
      this.setLoans();
  }
}
