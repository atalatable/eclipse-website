import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { SocialsService } from 'src/app/services/socials.service';
import { Social } from 'src/app/shared/models/Social';

@Component({
  selector: 'app-admin-socials',
  templateUrl: './admin-socials.component.html',
  styleUrls: ['./admin-socials.component.scss']
})
export class AdminSocialsComponent implements OnInit {

  public currentList:Social[] = [];

  public addName:string = "";
  public addLink:string = "";

  public chooseUpdateName:string = "";
  public updateName:string = "";
  public updateLink:string = "";
  public updatePrevName:string = "";

  public deleteName:string = "";

  constructor(private adminService:AdminService, private socialsService:SocialsService, private toastrService:ToastrService) { }

  ngOnInit(): void {
      let socialsObservable:Observable<Social[]>;

      socialsObservable = this.socialsService.getAll();

      socialsObservable.subscribe((serverSocial) => {
        this.currentList = serverSocial;
      });
  }

  public add() {
    this.adminService.addSocial({name: this.addName, link: this.addLink}).subscribe(
      resp => {
        this.resetValues();
        this.toastrService.success(resp['message'])
    }, err => {
        console.error(err)
        this.toastrService.error("An error occured");
    });
  }

  public update() {
    this.adminService.updateSocial({name: this.updateName, link: this.updateLink}, this.updatePrevName).subscribe(
      resp => {
        this.resetValues();
        this.toastrService.success(resp['message'])
    }, err => {
        console.error(err)
        this.toastrService.error("An error occured");
    });
    this.resetValues()
  }

  public changeEditValue():void {
    const index = this.currentList.findIndex((social) => social.name === this.chooseUpdateName);
    if (index == -1) { return }
    this.updateName = this.currentList[index].name;
    this.updateLink = this.currentList[index].link;
    this.updatePrevName = this.currentList[index].name;
  }

  public delete() {
    this.adminService.deleteSocial(this.deleteName).subscribe(
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
    this.addLink = "";
    this.chooseUpdateName = "";
    this.updateName = "";
    this.updateLink = "";
    this.updatePrevName = "";
    this.deleteName = "";

    let socialsObservable:Observable<Social[]>;

    socialsObservable = this.socialsService.getAll();

    socialsObservable.subscribe((serverSocial) => {
      this.currentList = serverSocial;
    });
  }
}
