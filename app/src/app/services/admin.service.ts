import { Injectable } from '@angular/core';
import { Admin } from '../shared/models/Admin';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAdminLogin } from '../shared/interfaces/IAdminLogin';
import { HttpClient } from '@angular/common/http';
import { ADMIN_ADD_MEMBER, ADMIN_LOGIN_URL, ADMIN_URL_BY_NAME } from '../shared/constants/url';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Member } from '../shared/models/Member';

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

  public addMember(member:Member) {
    return this.http.post<unknown>(ADMIN_ADD_MEMBER, member, {withCredentials: true});
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