import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/shared/models/News';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent {
  @Input() news!: News;
  @Input() index!: number;
  
  public getDesc():string {
    return this.news.description ?
      this.news.description : "Click to see more..."
  }

  public goToNewsDetail():void {
    this.router.navigate(['/news/view', this.index + 1]);
  }

  constructor(private router:Router) {}
}
