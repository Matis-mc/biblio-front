import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    loginUrl:string = "http://localhost:3000/auth/login"

    constructor(private http: HttpClient, private router:Router) {
        
    }

    public login(username:string, password:string){
        return this.http.post(this.loginUrl, {
            email:username,
            password:password
        }).subscribe(res => {
            this.setSession(res);
            this.navigate(res);
        })
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('token', authResult.token);
        localStorage.setItem('userID', authResult.userID);
        localStorage.setItem('role', authResult.role);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }  
    
    private navigate(authResult){
        if(authResult.role){
            switch(authResult.role){
                case "USER":
                    this.router.navigateByUrl('bibliotheque');
                    break;
                case "ADMIN":
                    this.router.navigateByUrl('administration');
                    break;
                default:
                    this.router.navigateByUrl('');
            }
        }
    }

    logout() {
        localStorage.removeItem("role");
        localStorage.removeItem("userID")
        localStorage.removeItem("token");
        localStorage.removeItem("expires_at");
        this.router.navigateByUrl('');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getUserID(){
        return localStorage.getItem('userID')
    }

    getUserRole(){
        return localStorage.getItem('role')
    }

    getUserName(){
        return "michel";
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    






}