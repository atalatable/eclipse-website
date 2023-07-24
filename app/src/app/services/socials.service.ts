import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SOCIALS_URL } from '../shared/constants/url';
import { Observable } from 'rxjs';
import { Social } from '../shared/models/Social';

@Injectable({
  providedIn: 'root'
})
export class SocialsService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Social[]> {
    return this.http.get<Social[]>(SOCIALS_URL);
  }
}
