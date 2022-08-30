
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

 datVal:any = document.getElementById("dateVal");
 datePipeString:any
 note:any=[]

  constructor(private datePipe:DatePipe, private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void { 
    if(localStorage.getItem("note")!=null){
      this.note=JSON.parse(localStorage.getItem("note")!);
    }

    this.datePipeString= this.datePipe.transform(Date(),'yyyy-MM-dd');
      (document.getElementById("date")as HTMLInputElement).value= this.datePipeString;
  
  
  }
  day(){
    let today:any= new Date((document.getElementById("date")as HTMLInputElement).value);
 
    
    if((document.getElementById("mySelect")as HTMLInputElement).value== '0'){
      
  
      this.datePipeString= this.datePipe.transform(today,'yyyy-MM-dd');
      (document.getElementById("date")as HTMLInputElement).value= this.datePipeString;

    }
    if((document.getElementById("mySelect")as HTMLInputElement).value== '1'){
      
      this.datePipeString= this.datePipe.transform(today.setDate(today.getDate()+1),'yyyy-MM-dd');
      (document.getElementById("date")as HTMLInputElement).value= this.datePipeString;

    }

    if((document.getElementById("mySelect")as HTMLInputElement).value== '2'){
  
      this.datePipeString= this.datePipe.transform(today.setDate(today.getDate()+7),'yyyy-MM-dd');
      (document.getElementById("date")as HTMLInputElement).value= this.datePipeString;

    }

    if((document.getElementById("mySelect")as HTMLInputElement).value== '3'){
    
      this.datePipeString= this.datePipe.transform(today.setMonth(today.getMonth()+1),'yyyy-MM-dd');
      (document.getElementById("date")as HTMLInputElement).value= this.datePipeString;

    }

    if((document.getElementById("mySelect")as HTMLInputElement).value== '4'){
    
      this.datePipeString= this.datePipe.transform(today.setDate(today.getDate()+365  ),'yyyy-MM-dd'  );
      (document.getElementById("date")as HTMLInputElement).value= this.datePipeString;

    } 
  
  
  }
  add(){
    let d=new Date()
    this.datePipeString= this.datePipe.transform(d,'yyyy-MM-dd');
    if( (document.getElementById("title")as HTMLInputElement).value!="" && (document.getElementById("note")as HTMLInputElement).value!="" ){
    this.note.push({
      title: (document.getElementById("title")as HTMLInputElement).value,
      note: (document.getElementById("note")as HTMLInputElement).value.trim(),
      date: (document.getElementById("date")as HTMLInputElement).value,
      currentDate:  this.datePipeString
      
    })
    localStorage.setItem("note",JSON.stringify(this.note));
    this.toastr.success("Sucessfully Added!!!", (document.getElementById("title")as HTMLInputElement).value)
    this.router.navigate([""])


  }
  else{
    alert("invalid entry!!")
    
  }


  }
 
}