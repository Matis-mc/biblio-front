import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {

  username : string;
  password : string;

  constructor(private authSrv:AuthService, private router:Router) { }

  public login(){
    console.log("login requested ...")
    this.authSrv.login(this.username, this.password);
  }

  ngOnInit(): void {
  }

}
