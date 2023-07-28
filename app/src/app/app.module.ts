import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { MembersComponent } from './components/pages/members/members.component';
import { NewsComponent } from './components/pages/news/news.component';
import { AboutComponent } from './components/pages/about/about.component';
import { UnknownComponent } from './components/pages/unknown/unknown.component';
import { MemberListComponent } from './components/partials/member-list/member-list.component';
import { MemberDetailComponent } from './components/partials/member-list/member-detail/member-detail.component';
import { LineupsListComponent } from './components/partials/lineups-list/lineups-list.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { NewsListComponent } from './components/partials/news-list/news-list.component';
import { NewsDetailComponent } from './components/partials/news-list/news-detail/news-detail.component';
import { NewsViewComponent } from './components/partials/news-view/news-view.component';
import { PageNavigatorComponent } from './components/partials/page-navigator/page-navigator.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MembersComponent,
    NewsComponent,
    AboutComponent,
    UnknownComponent,
    MemberListComponent,
    MemberDetailComponent,
    LineupsListComponent,
    LoadingComponent,
    NewsListComponent,
    NewsDetailComponent,
    NewsViewComponent,
    PageNavigatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
