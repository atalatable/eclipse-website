import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/shared/models/News';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.scss']
})
export class NewsViewComponent implements OnInit, OnDestroy {
  public news: News;
  
  private routeSubscription: Subscription;

  constructor(
    private newsService:NewsService,
    private activatedRoute:ActivatedRoute,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe((param) => {
      let newsObservable: Observable<News>;

      if (param.title) {
        newsObservable = this.newsService.getNewsByTitle(param.title);
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
