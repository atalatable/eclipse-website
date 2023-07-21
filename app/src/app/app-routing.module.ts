import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MembersComponent } from './components/pages/members/members.component';
import { NewsComponent } from './components/pages/news/news.component';
import { AboutComponent } from './components/pages/about/about.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'members', component:MembersComponent},
  {path:'news', component:NewsComponent},
  {path:'about', component:AboutComponent},
  {path:'**', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
