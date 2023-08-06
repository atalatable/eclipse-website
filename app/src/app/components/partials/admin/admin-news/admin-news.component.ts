import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/shared/models/News';
import { Social } from 'src/app/shared/models/Social';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {

  public currentList:string[] = [];

  public addTitle:string = "";
  public addDesc:string = "";
  public addContent:string = "";
  public addImageUrl:string = "";

  public chooseUpdateTitle:string = "";
  public updateTitle:string = "";
  public updateDesc:string = "";
  public updateContent:string = "";
  public updateImageUrl:string = "";

  public deleteTitle:string = "";

  constructor(private adminService:AdminService, private newsService:NewsService, private toastrService:ToastrService) { }

  ngOnInit(): void {
      let titleObservable:Observable<string[]>;

      titleObservable = this.newsService.getAllTitle();

      titleObservable.subscribe((serverSocial) => {
        this.currentList = serverSocial;
      });
  }

  public add() {
    this.adminService.addNews({
      title: this.addTitle,
      description: this.addDesc,
      content: this.addContent,
      imageUrl: this.addImageUrl
    }).subscribe(
      resp => {
        this.resetValues();
        this.toastrService.success(resp['message'])
    }, err => {
        console.error(err)
        this.toastrService.error("An error occured");
    });
  }

  public update() {
    this.adminService.updateNews({
      title: this.updateTitle,
      description: this.updateDesc,
      content: this.updateContent,
      imageUrl: this.updateImageUrl
    }, this.chooseUpdateTitle).subscribe(
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
    if (this.currentList.includes(this.chooseUpdateTitle)) {
      let newsObservable:Observable<News>;

      newsObservable = this.newsService.getNewsByTitle(this.chooseUpdateTitle);

      newsObservable.subscribe((serverNews) => {
        this.updateTitle = serverNews.title;
        this.updateDesc = serverNews.description;
        this.updateContent = serverNews.content;
        this.updateImageUrl = serverNews.imageUrl;
      });

    }
  }

  public delete() {
    this.adminService.deleteNews(this.deleteTitle).subscribe(
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
    this.addContent = "";
    this.addDesc = "";
    this.addImageUrl = "";
    this.addTitle = "";

    this.updateTitle = "";
    this.updateContent = "";
    this.updateDesc = "";
    this.updateImageUrl = "";

    this.deleteTitle = "";

    let titleObservable:Observable<string[]>;

    titleObservable = this.newsService.getAllTitle();

    titleObservable.subscribe((serverSocial) => {
      this.currentList = serverSocial;
    });
  }
}
