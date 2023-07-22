import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { MembersComponent } from './components/pages/members/members.component';
import { NewsComponent } from './components/pages/news/news.component';
import { AboutComponent } from './components/pages/about/about.component';
import { UnknownComponent } from './components/pages/unknown/unknown.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MembersComponent,
    NewsComponent,
    AboutComponent,
    UnknownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
