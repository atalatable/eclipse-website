import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { MembersService } from 'src/app/services/members.service';
import { Admin } from 'src/app/shared/models/Admin';

@Component({
  selector: 'app-admin-admins',
  templateUrl: './admin-admins.component.html',
  styleUrls: ['./admin-admins.component.scss']
})
export class AdminAdminsComponent implements OnInit {
  public currentList:string[] = [];

  public addName:string = "";
  public addPassword:string = "";

  public currentPassword:string = "";
  public updatePassword:string = "";

  public deleteName:string = "";

  public currentAdmin:Admin;

  constructor(private adminService:AdminService, private memberService:MembersService, private toastrService:ToastrService) { }

  ngOnInit(): void {
      let adminObservable:Observable<string[]>;

      adminObservable = this.adminService.getAdminNames();

      adminObservable.subscribe((adminNames) => {
        this.currentList = adminNames;
      });

      this.adminService.adminObservable.subscribe((admin) => {
        this.currentAdmin = admin;
      })
  }

  public add() {
    this.adminService.addAdmin({username: this.addName, password: this.addPassword}).subscribe(
      resp => {
        this.resetValues();
        this.toastrService.success(resp['message']);
    }, err => {
        console.error(err);
        this.toastrService.error("An error occured");
    });
  }

  public update() {
    this.adminService.updateAdmin(this.updatePassword, this.currentPassword, this.currentAdmin.username).subscribe(
      resp => {
        this.resetValues();
        this.toastrService.success(resp['message']);
    }, err => {
        console.error(err);
        this.toastrService.error("An error occured");
    });
    this.resetValues()
  }

  public delete() {
    this.adminService.deleteAdmin(this.currentAdmin.username).subscribe(
      resp => {
        this.resetValues();
        this.toastrService.success(resp['message'])
    }, err => {
        console.error(err)
        this.toastrService.error("An error occured");
    });
    this.resetValues()
  }

  private resetValues():void {
    this.addName = "";
    this.addPassword = "";
    this.updatePassword = "";
    this.currentPassword = "";
    this.deleteName = "";

    let adminObservable:Observable<string[]>;

    adminObservable = this.adminService.getAdminNames();

    adminObservable.subscribe((adminNames) => {
      this.currentList = adminNames;
    });
  }
}
