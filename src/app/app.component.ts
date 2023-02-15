import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { AuthService } from './auth/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bibliothèque';

  constructor(public authSrv: AuthService){
    
  }

  public isLoggedIn(){
    return this.authSrv.isLoggedIn();
  }

  public isUser(){
      if(this.isLoggedIn()){
        if(this.authSrv.getUserRole.toString() == "USER"){
          return true;
        }
      }
      return false;
  }

  public isAdmin(){
    if(this.isLoggedIn()){
      if(this.authSrv.getUserRole.toString() == "ADMIN"){
        return true;
      }
    }
    return false;
}
}
