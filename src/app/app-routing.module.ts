import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNoteComponent } from './add-note/add-note.component';
import { DefaltComponent } from './defalt/defalt.component';
import { HomeComponent } from './home/home.component';
import { UpdateNoteComponent } from './update-note/update-note.component';

const routes: Routes = [{path:"",component:HomeComponent},
{path:"default",component: DefaltComponent},
{path:"addNote",component:AddNoteComponent},
{path:"updateNote/:id",component:UpdateNoteComponent},]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
