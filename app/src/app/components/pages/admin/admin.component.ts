import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/shared/models/Admin';
import { Member } from 'src/app/shared/models/Member';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  admin!:Admin;

  constructor(
    private adminService:AdminService,
    private router:Router
  ) {
    this.adminService.adminObservable.subscribe((newAdmin) => {
      this.admin = newAdmin;
    });
  }

  ngOnInit(): void {
      if (!this.admin.token) {
        this.router.navigateByUrl('/login');
      }
  }

  logout():void {
    this.adminService.logout();
  }

  add():void {
    let m:any;

    let luObservable:Observable<unknown>;

    luObservable = this.adminService.addMember(new Member());

    luObservable.subscribe(serverLu => {
      m = serverLu;
    });

    console.log(m)
  }
}
