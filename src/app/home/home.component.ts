import { Component, NgModule, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

import {

  moveItemInArray,
  CdkDragDrop,
  CdkDragEnter,
  CdkDropList
} from "@angular/cdk/drag-drop";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  note:any=[]
  savenote:any=[]
  count:any=0
  isDisplay:any=false;
  title: any;
  datePipeString:any
 

  constructor(private datePipe: DatePipe, private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  
    if(localStorage.getItem("note")!=null){
      this.note=JSON.parse(localStorage.getItem("note")!);
    }
    let d=new Date()
    
    this.datePipeString= this.datePipe.transform(d,'yyyy-MM-dd');
    for (let i = 0; i < this.note.length; i++) {
      let a=new Date(this.note[i].currentDate)
     
         
      
    var Time = d.getTime() - a.getTime(); 
    
    
    var Days = Time / (1000 * 3600 * 24); //Diference in Days
  
    
      
      if(Math.floor(Days)>=7){
        this.note.splice(i,1)
        localStorage.setItem("note",JSON.stringify(this.note))
        this.toastr.error("Sucessfully deleted Reserved time completed!!!",  this.note[i].title)
        console.log("hi")
       
        
      }
      
    }


    if(this.note.length==0){
      this.router.navigate(["default"])
    }
    if(localStorage.getItem("savenote")!=null){
      this.savenote=JSON.parse(localStorage.getItem("savenote")!);
    }
this.count=this.savenote.length

  }
addNote(){
  this.router.navigate(["addNote"])

}

drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.note, event.previousIndex, event.currentIndex);
  localStorage.setItem("note",JSON.stringify(this.note))
}




entered($event: CdkDragEnter) {
  console.log($event.item.data, $event.container.data);
  moveItemInArray(this.note, $event.item.data, $event.container.data);
  localStorage.setItem("note",JSON.stringify(this.note))
}
@ViewChildren(CdkDropList) dropsQuery: any;

drops:any=[];

ngAfterViewInit() {
  this.dropsQuery.changes.subscribe(() => {
    this.drops = this.dropsQuery.toArray();
  });
  Promise.resolve().then(() => {
    this.drops = this.dropsQuery.toArray();
    console.log(this.drops);
  });
}


edit(i :any){
 this.router.navigate(["updateNote/",i])  

}

delete(i :any, n:any){
  if (confirm("Are You Sure !!")) {
    this.note.splice(i,1)
    localStorage.setItem("note",JSON.stringify(this.note))
    this.toastr.error("Sucessfully deleted!!!", n.title)


    if(this.note.length==0){
      this.router.navigate(["default"])

    }
    
  } else {
    
  }
}
  save(n :any, i:any){
this.savenote.push(this.note[i])
localStorage.setItem("savenote",JSON.stringify(this.savenote))
this.count=this.savenote.length
    this.note.splice(i,1)
    localStorage.setItem("note",JSON.stringify(this.note))
    this.toastr.success("Sucessfully Completed!!!", n.title)
    if(this.note.length==0){
      this.router.navigate(["default"])

    }
    
}
display(){
  if(this.isDisplay==false){
  (document.getElementById("completed")as HTMLInputElement).style.cssText=`display: unset;`  
  this.isDisplay=true;
  (document.getElementById("body")as HTMLInputElement).style.cssText=`filter: blur(10px); pointer-events: none;`
  }
  else{
    (document.getElementById("completed")as HTMLInputElement).style.cssText=`display: none;`
    this.isDisplay=false;
    (document.getElementById("body")as HTMLInputElement).style.cssText=`filter: blur(0px);`
  }

}

deletecomp(i:any, s :any){
  if (confirm("Are You Sure !!")) {
  this.savenote.splice(i,1)
  localStorage.setItem("savenote",JSON.stringify(this.savenote))
  this.count=this.savenote.length
  if(this.count==0){
    (document.getElementById("body")as HTMLInputElement).style.cssText=`filter: blur(0px);`

  }
  this.toastr.error("Sucessfully deleted !!!", s.title)
  }
  else{}

}

search() {
  if (this.title == '') {
    this.ngOnInit();
  } else {
    this.note = this.note.filter((res: any) => {
      return res.title
        .toLocaleLowerCase()
        .match(this.title.toLocaleLowerCase());
    });
  }
}
uncompleted(i:any,s:any){
  this.note.push(this.savenote[i])
localStorage.setItem("note",JSON.stringify(this.note))

    this.savenote.splice(i,1)
    localStorage.setItem("savenote",JSON.stringify(this.savenote))
    this.toastr.success("Sucessfully Added List to be Completed!!!", s.title)

    this.count=this.savenote.length
    if(this.count==0){
      (document.getElementById("body")as HTMLInputElement).style.cssText=`filter: blur(0px);`

    }
    if(this.note.length==0){
      this.router.navigate(["default"])

    }

}
sort(x:any){
 if(x.target.name=="title"){
  this.note.sort((a:any,b:any) => a.title.localeCompare(b.title)); }
  else if(x.target.name=="date"){
    this.note.sort((a:any,b:any) => a.date.localeCompare(b.date)); }

localStorage.setItem("note",JSON.stringify(this.note))  
console.log(this.note);


}


}



 