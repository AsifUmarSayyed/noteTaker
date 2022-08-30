import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit{

  datVal:any = document.getElementById("dateVal");
  datePipeString:any
  note:any=[]
  nId:any;
  lnote:any;
 
   constructor(private datePipe:DatePipe, private router:Router,private toastr: ToastrService,private activated:ActivatedRoute) { }
 
   ngOnInit(): void { 

    if(localStorage.getItem("note")!=null){
      this.note=JSON.parse(localStorage.getItem("note")!);
    }

      this.activated.params.subscribe(data=>{
        this.nId=data;
      console.log(this.note[this.nId.id]);
      
      for (let i = 0; i < this.note.length; i++) {
        if(this.nId.id==i){
          this.lnote=this.note[i]
          
          
        }
        
      } 
      
        

    })
    
    

     
     this.datePipeString= this.datePipe.transform(Date(),'dd-MM-yyyy');
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
   upadd(){
    if( (document.getElementById("title")as HTMLInputElement).value!="" && (document.getElementById("note")as HTMLInputElement).value!="" ){
    
    this.note[this.nId.id]={
      title: (document.getElementById("title")as HTMLInputElement).value,
      note: (document.getElementById("note")as HTMLInputElement).value.trim(),
      date: (document.getElementById("date")as HTMLInputElement).value
      
    }
    
     localStorage.setItem("note",JSON.stringify(this.note));
     this.toastr.success("Sucessfully Updated!!", (document.getElementById("title")as HTMLInputElement).value)
     this.router.navigate([""])
  }
  else{
    alert("invalid entry!!")
    
  }

 
   }
 
 
 
 }