import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-admin-lineups',
  templateUrl: './admin-lineups.component.html',
  styleUrls: ['./admin-lineups.component.scss']
})
export class AdminLineupsComponent implements OnInit {

  public currentList:string[] = [];

  public addName:string = "";

  public chooseUpdateName:string = "";
  public updateName:string = "";
  public updatePrevName:string = "";

  public deleteName:string = "";

  constructor(private adminService:AdminService, private memberService:MembersService, private toastrService:ToastrService) { }

  ngOnInit(): void {
      let luObservable:Observable<string[]>;

      luObservable = this.memberService.getAllLu();

      luObservable.subscribe((serverLu) => {
        this.currentList = serverLu;
      });
  }

  public add() {
    this.adminService.addLineup(this.addName).subscribe(
      resp => {
        this.resetValues();
        this.toastrService.success(resp['message']);
    }, err => {
        console.error(err);
        this.toastrService.error("An error occured");
    });
  }

  public update() {
    this.adminService.updateLineup(this.updateName, this.updatePrevName).subscribe(
      resp => {
        this.resetValues();
        this.toastrService.success(resp['message']);
    }, err => {
        console.error(err);
        this.toastrService.error("An error occured");
    });
    this.resetValues()
  }

  public changeEditValue():void {
    const index = this.currentList.findIndex((lineuup) => lineuup === this.chooseUpdateName);
    if (index == -1) { return }
    this.updateName = this.currentList[index];
    this.updatePrevName = this.currentList[index];
  }

  public delete() {
    this.adminService.deleteLu(this.deleteName).subscribe(
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
    this.chooseUpdateName = "";
    this.updateName = "";
    this.updatePrevName = "";
    this.deleteName = "";

    let luObservable:Observable<string[]>;

    luObservable = this.memberService.getAllLu();

    luObservable.subscribe((luSocial) => {
      this.currentList = luSocial;
    });
  }
}
