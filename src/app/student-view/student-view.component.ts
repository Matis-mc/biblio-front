import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit {

  type="BIBLIOTHEQUE"

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
        default:
          this.display = "BOOKS";
          break;
      }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
