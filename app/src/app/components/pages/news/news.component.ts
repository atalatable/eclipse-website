import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';
import { NEWS_PER_PAGES } from 'src/app/shared/constants/const';
import { News } from 'src/app/shared/models/News';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  news: News[] = [];
  page:number;
  private routeSubscription: Subscription;

  constructor(
    private newsService:NewsService,
    private activatedRoute:ActivatedRoute,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe((param) => {
      let newsObservable: Observable<News[]>;

      if (param.page && param.page != 1) {
        newsObservable = this.newsService.getNewsFromTo((param.page - 1) * NEWS_PER_PAGES, NEWS_PER_PAGES);
        this.page = parseInt(param.page);
      } else {
        newsObservable = this.newsService.getNewsFromTo(0, NEWS_PER_PAGES);
        this.page = 1;
      }
      

      newsObservable.subscribe((serverNews) => {
        this.news = serverNews;
        this.cdr.detectChanges();
      })
    });
  }

  ngOnDestroy(): void {
      this.routeSubscription.unsubscribe();
  }
}
