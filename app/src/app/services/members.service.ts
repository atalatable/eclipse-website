import { Injectable } from '@angular/core';
import { Member } from '../shared/models/Member';
import { HttpClient } from '@angular/common/http';
import { LINEUPS_URL, MEMBERS_BY_LU_URL, MEMBERS_URL } from '../shared/constants/url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Member[]> {
    return this.http.get<Member[]>(MEMBERS_URL);
  }

  getAllLu(): Observable<string[]> {
    return this.http.get<string[]>(LINEUPS_URL);
  }

  getAllMembersByLu(lu:string): Observable<Member[]> {
    return lu == "All" ?
    this.getAll() :
    this.http.get<Member[]>(MEMBERS_BY_LU_URL + lu);
  }
}
