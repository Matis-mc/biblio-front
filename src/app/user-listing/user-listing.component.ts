import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../interface/User';
import { Users } from '../interface/Users';
import { UserListingService } from '../service/user-listing-service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit {

  @Input()
  display :string;

  user$ : ReplaySubject<User[]> = new ReplaySubject();
  names : string[] = [];
  filteredName$: Observable<string[]>;
  nameSelectControl = new FormControl('');


  constructor( private userSrv: UserListingService) { }

  public getAllUsers(){
    this.userSrv.getAll().subscribe((users: Users) => {
      this.user$.next(users.users);
      this.updateNameList(users.users);
    });
  }

  public getUserFromResearch(){
    this.userSrv.getUserFromName(this.nameSelectControl.value).subscribe((users: Users) => {
      this.user$.next(users.users);
    });
  }

  public updateNameList(users : User[]){
      this.names = [];
      users.forEach(user =>{
        this.names.push(user.email);
      })
  }

  public filterTitleList(){
    this.filteredName$ = this.nameSelectControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.names.filter(name => name.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

}
