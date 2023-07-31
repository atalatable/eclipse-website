import { Injectable } from '@angular/core';
import { Admin } from '../shared/models/Admin';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAdminLogin } from '../shared/interfaces/IAdminLogin';
import { HttpClient } from '@angular/common/http';
import { ADMIN_LOGIN_URL } from '../shared/constants/url';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminSubject = new BehaviorSubject<Admin>(this.getAdminFromLocalStorage());
  public adminObservable:Observable<Admin>;

  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.adminObservable = this.adminSubject.asObservable();
  }

  login(adminLogin:IAdminLogin):Observable<Admin> {
    return this.http.post<Admin>(ADMIN_LOGIN_URL, adminLogin).pipe(
      tap({
        next: (admin) => {
          this.setTolLocalStorage(admin);
          this.adminSubject.next(admin)
          this.toastrService.success( `Welcome, ${admin.username}`, "Login successful" )
        },
        error: (err) => {
          this.toastrService.error( err.error, "Login Failed" )
        }
      })
    )
  }
  
  logout():void {
    this.adminSubject.next(new Admin());
    localStorage.removeItem("Admin");
    window.location.reload();
  }

  private setTolLocalStorage(admin:Admin):void {
    localStorage.setItem("Admin", JSON.stringify(admin));
  }

  private getAdminFromLocalStorage():Admin {
    const adminJSON = localStorage.getItem("Admin");
    if (adminJSON) { return JSON.parse(adminJSON) as Admin; }
    return new Admin();
  }
}
