import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-defalt',
  templateUrl: './defalt.component.html',
  styleUrls: ['./defalt.component.scss']
})
export class DefaltComponent implements OnInit {
  note:any=[];
  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
    if(localStorage.getItem("note")!=null){
      this.note=JSON.parse(localStorage.getItem("note")!);
    }
    if(this.note.length!=0){
      this.router.navigate([""])

    }
  }
  add(){
    this.router.navigate(["addNote"])
  }

}
