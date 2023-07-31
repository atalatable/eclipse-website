import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MembersComponent } from './components/pages/members/members.component';
import { NewsComponent } from './components/pages/news/news.component';
import { AboutComponent } from './components/pages/about/about.component';
import { UnknownComponent } from './components/pages/unknown/unknown.component';
import { NewsViewComponent } from './components/partials/news-view/news-view.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { LoginComponent } from './components/pages/login/login.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'members', component:MembersComponent},
  {path:'members/:lineup', component:MembersComponent},
  {path:'news', component:NewsComponent},
  {path:'news/:page', component:NewsComponent},
  {path:'news/view/:title', component:NewsViewComponent},
  {path:'about', component:AboutComponent},
  {path:'login', component:LoginComponent},
  {path:'admin', component:AdminComponent},
  {path:'**', component:UnknownComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
