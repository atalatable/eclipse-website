import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../shared/models/News';
import { NEWS_BY_ID_URL, NEWS_COUNT_URL } from '../shared/constants/url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }

  getNewsByID(id:number): Observable<News> {
    return this.http.get<News>(NEWS_BY_ID_URL + id);
  }

  getNewsCount(): Observable<number> {
    return this.http.get<number>(NEWS_COUNT_URL);
  }

  getNewsFromTo(id_start:number, count:number): Observable<News[]> {
    return this.http.get<News[]>(NEWS_BY_ID_URL + id_start + "/" + count);
  }
}
