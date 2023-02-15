import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  
  type = "ADMINISTRATION";
  display = "BOOKS";

  onSelectedTabChange(event){
      console.log(event)
      switch(event.index){
        case 0:
          this.display = "BOOKS";
          break;
        case 1:
          this.display = "LOANS";
          break;
        case 2:
          this.display = "USERS";
          break;
        default:
          this.display = "BOOKS";
          break;
      }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
