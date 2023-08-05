import { Injectable } from '@angular/core';
import { Admin } from '../shared/models/Admin';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAdminLogin } from '../shared/interfaces/IAdminLogin';
import { HttpClient } from '@angular/common/http';
import { ADMIN_ADD_ADMIN, ADMIN_ADD_LINEUP, ADMIN_ADD_MEMBER, ADMIN_ADD_NEWS, ADMIN_ADD_SOCIAL, ADMIN_DELETE_ADMIN, ADMIN_DELETE_LINEUP, ADMIN_DELETE_MEMBER, ADMIN_DELETE_NEWS, ADMIN_DELETE_SOCIAL, ADMIN_GET_ADMINS, ADMIN_LOGIN_URL, ADMIN_UPDATE_ADMIN, ADMIN_UPDATE_LINEUP, ADMIN_UPDATE_MEMBER, ADMIN_UPDATE_NEWS, ADMIN_UPDATE_SOCIAL } from '../shared/constants/url';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Member } from '../shared/models/Member';
import { Social } from '../shared/models/Social';
import { News } from '../shared/models/News';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminSubject = new BehaviorSubject<Admin>(this.getAdminFromLocalStorage());
  public adminObservable:Observable<Admin>;

  constructor(private http:HttpClient, private toastrService:ToastrService, private cookieService:CookieService) {
    this.adminObservable = this.adminSubject.asObservable();
  }

  public login(adminLogin:IAdminLogin):Observable<Admin> {
    return this.http.post<Admin>(ADMIN_LOGIN_URL, adminLogin).pipe(
      tap({
        next: (admin) => {
          this.setTolLocalStorage(admin);
          this.adminSubject.next(admin);
          this.toastrService.success( `Welcome, ${admin.username}`, "Login successful" )
        },
        error: (err) => {
          this.toastrService.error( err.error, "Login Failed" );
        }
      })
    )
  }
  
  public logout():void {
    this.adminSubject.next(new Admin());
    this.cookieService.delete('token');
    window.location.reload();
  }

  public getAdminNames(): Observable<string[]> {
    return this.http.get<string[]>(ADMIN_GET_ADMINS, {withCredentials: true});
  }

  public addMember(member:Member) {
    return this.http.post<unknown>(ADMIN_ADD_MEMBER, member, {withCredentials: true});
  }

  public addSocial(social:Social) {
    return this.http.post<unknown>(ADMIN_ADD_SOCIAL, social, {withCredentials: true});
  }

  public addNews(news:News) {
    return this.http.post<unknown>(ADMIN_ADD_NEWS, news, {withCredentials: true});
  }

  public addLineup(name:string) {
    return this.http.post<unknown>(ADMIN_ADD_LINEUP, {name: name}, {withCredentials: true})
  }

  public addAdmin(admin:{username:string,password:string}) {
    return this.http.post<unknown>(ADMIN_ADD_ADMIN, admin, {withCredentials: true});
  }

  public deleteMember(memberName:string) {
    return this.http.post<unknown>(ADMIN_DELETE_MEMBER, {name: memberName}, {withCredentials: true});
  }

  public deleteSocial(socialName:string) {
    return this.http.post<unknown>(ADMIN_DELETE_SOCIAL, {name: socialName}, {withCredentials: true});
  }

  public deleteNews(newsTitle:string) {
    return this.http.post<unknown>(ADMIN_DELETE_NEWS, {title: newsTitle}, {withCredentials: true});
  }

  public deleteLu(luName:string) {
    return this.http.post<unknown>(ADMIN_DELETE_LINEUP, {name: luName}, {withCredentials: true});
  }

  public deleteAdmin(adminName:string) {
    return this.http.post<unknown>(ADMIN_DELETE_ADMIN, {username: adminName}, {withCredentials: true});
  }

  public updateMember(member:Member, prevName:string) {
    let sentMember = member;
    sentMember['prevName'] = prevName;
    return this.http.post<unknown>(ADMIN_UPDATE_MEMBER, sentMember, {withCredentials: true});
  }

  public updateSocial(social:Social, prevName:string) {
    let sentSocial = social;
    sentSocial['prevName'] = prevName;
    return this.http.post<unknown>(ADMIN_UPDATE_SOCIAL, sentSocial, {withCredentials: true});
  }

  public updateNews(news:News, prevTitle:string) {
    let sentNews = news;
    sentNews['prevTitle'] = prevTitle;
    return this.http.post<unknown>(ADMIN_UPDATE_NEWS, sentNews, {withCredentials: true});
  }

  public updateLineup(luName:string, prevName:string) {
    let sentLu = { name: luName, prevName: prevName }
    return this.http.post<unknown>(ADMIN_UPDATE_LINEUP, sentLu, {withCredentials: true});
  }

  public updateAdmin(newPassword:string, oldPassword:string, adminName:string) {
    let sentObj = {
      adminName: adminName, newPassword: newPassword, oldPassword: oldPassword
    }
    return this.http.post<unknown>(ADMIN_UPDATE_ADMIN, sentObj, {withCredentials: true});
  }

  private setTolLocalStorage(admin:Admin):void {
    this.cookieService.set('token', admin.token, 1, '/', 'localhost', false, "Strict");
  }

  private getAdminFromLocalStorage():Admin {

    const adminToken = this.cookieService.get('token');
    
    if(adminToken) {
      const adminDecoded = JSON.parse(
        this.b64DecodeUnicode(adminToken.split('.')[1].replace('-', '+').replace('_', '/'))
      );
  
      const admin:Admin = {
        username: adminDecoded.username,
        token: adminToken
      }
      return admin
    }
    return new Admin();
  }
  
  private b64DecodeUnicode(str:string): string {
      return decodeURIComponent(
        Array.prototype.map.call(atob(str), c =>
          '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
  }
}