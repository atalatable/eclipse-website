import { Component, Input } from '@angular/core';
import { News } from 'src/app/shared/models/News';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent {
  @Input() newsList: News[]; 
}
