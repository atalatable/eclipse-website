import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { MembersService } from 'src/app/services/members.service';
import { Member } from 'src/app/shared/models/Member';

@Component({
  selector: 'app-admin-members',
  templateUrl: './admin-members.component.html',
  styleUrls: ['./admin-members.component.scss']
})
export class AdminMembersComponent implements OnInit {
  public currentList:string[] = [];
  public lineups:string[] = [];

  public addName:string = "";
  public addRole:string = "";
  public addImageUrl:string = "";
  public addLu:string = "";

  public chooseUpdateName:string = "";
  public updateName:string = "";
  public updateRole:string = "";
  public updateImageUrl:string = "";
  public updateLu:string = "";

  public deleteName:string = "";

  constructor(private adminService:AdminService, private memberService:MembersService, private toastrService:ToastrService) { }

  ngOnInit(): void {
      this.updateObservables();
  }

  public add() {
    this.adminService.addMember({
      name: this.addName,
      role: this.addRole,
      imageUrl: this.addImageUrl,
      lineup: this.addLu
    }).subscribe(
      resp => {
        this.resetValues();
        this.toastrService.success(resp['message']);
    }, err => {
        console.error(err);
        this.toastrService.error("An error occured");
    });
  }

  public update() {
    this.adminService.updateMember({name: this.updateName, role: this.updateRole, lineup: this.updateLu, imageUrl: this.updateImageUrl}, this.chooseUpdateName).subscribe(
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
    this.adminService.deleteMember(this.deleteName).subscribe(
      resp => {
        this.resetValues();
        this.toastrService.success(resp['message'])
    }, err => {
        console.error(err)
        this.toastrService.error("An error occured");
    });
    this.resetValues()
  }

  public changeEditValue() {
    if (this.currentList.includes(this.chooseUpdateName)) {
      let memberObservable:Observable<Member>;

      memberObservable = this.memberService.getByName(this.chooseUpdateName);

      memberObservable.subscribe((serverMember) => {
        this.updateName = serverMember.name;
        this.updateRole = serverMember.role;
        this.updateImageUrl = serverMember.imageUrl;
        this.updateLu = serverMember.lineup;
      });
    }
  }

  private updateObservables(): void {
    let luObservable:Observable<string[]>;
    let memberObservable:Observable<string[]>;

    memberObservable = this.memberService.getAllNames();
    luObservable = this.memberService.getAllLu();

    luObservable.subscribe((serverLu) => {
      this.lineups = serverLu;
      this.addLu = this.lineups[0];
    });

    memberObservable.subscribe((serverNames) => {
      this.currentList = serverNames;
    });
  }

  private resetValues():void {
    this.addName = "";
    this.addImageUrl = "";
    this.addLu = this.lineups[0];
    this.addRole = "";

    this.chooseUpdateName = "";
    this.updateName = "";
    this.updateRole = "";
    this.updateImageUrl = "";
    this.updateLu = "";

    this.deleteName = "";

    this.updateObservables();
  }
}
