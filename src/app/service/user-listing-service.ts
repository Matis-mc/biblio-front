import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Observable } from "rxjs";
import { Users } from "../interface/Users";
import { User } from "../interface/User";
import { Loans } from "../interface/Loans";


@Injectable({
    providedIn: 'root'
  })
export class UserListingService {

    UrlUser = "http://localhost:3000/user"
    UrlLoan = "http://localhost:3000/loan/user/"


    constructor(private http : HttpClient) { }


    saveUser(user:User){
        return this.http.post(this.UrlUser, user);
    }s

    getLoansFomUser(id): Observable<Loans> {
        return this.http.get<Loans>(this.UrlLoan + id);
     } 
    
    getAll(): Observable<Users> {
       return this.http.get<Users>(this.UrlUser);
    }

    getUserFromName(name:string){
        return this.http.get<Users>(this.UrlUser + "/" + name);
    }

}