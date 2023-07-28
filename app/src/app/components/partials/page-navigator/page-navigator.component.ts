import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';
import { NEWS_PER_PAGES } from 'src/app/shared/constants/const';

@Component({
  selector: 'app-page-navigator',
  templateUrl: './page-navigator.component.html',
  styleUrls: ['./page-navigator.component.scss']
})
export class PageNavigatorComponent {
  @Input() currentPage:number;

  public newsAmmount:any;

  constructor(newsService:NewsService, private router:Router) {
    let newsAmmoutObservable:Observable<any>;

    newsAmmoutObservable = newsService.getNewsCount();

    newsAmmoutObservable.subscribe(ammount => {
      this.newsAmmount = ammount.count;
    });
  }

  public navigateToPage(pageID:number) {
    if (pageID > 0 && pageID <= this.getPageAmount()) {
      this.router.navigate(["/news", pageID]);
    }
  }

  public getPageAmount():number {
    return Math.ceil(this.newsAmmount / NEWS_PER_PAGES);
  }
}
